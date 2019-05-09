import {RequestMapping, PathParam, Controller, Body, Console} from 'tsunamy/core';
import { UserService } from './user.service';
import {IUser} from '../mongo/schema/interface/iUser';
import {IUserModel} from '../mongo/schema/user';
import {ControllerUsine} from '../core/controller/controllerUsine';

@Controller()
export class UserController extends ControllerUsine {

    constructor( private userService: UserService) {
        super(UserController);
    }

    @RequestMapping({ path: '/user/hi', method: 'GET'})
    hi() {
        return super.hi();
    }

    @RequestMapping({ path: '/user/create', method: 'POST'})
    async create(@Body() user: IUser) {
        /**
         * Problème qualitatif :
         *  La méthode create du userService s'execute forcement après la fin de cette fonction
         *  Peut importe les async/await que j'ai pu tester
         *  La réponse du serveur se fait donc avant que la promise ai pu se conclure
         *  ---> Impossible de renvoyer une donnée lorsque on utilise des callbacks
         */
        const val = await this.userService.create(user)
            .then((value: IUserModel | void) => {
                return value === undefined ? { error: 'Une erreur est survenue lors de la création de l\'utilisateur' } : value;
            })
            .catch(reason => {
                Console.Err(reason);
                return { error: 'Une erreur est survenue lors de la création de l\'utilisateur' };
        });

        Console.Info(val === undefined ? 'user undefined' : val.toString());
        return val.toString();
    }

    @RequestMapping({ path: '/user/{id}', method: 'GET'})
    getUser(@PathParam('id') id: any) {
        return {user: this.userService.getUser(id)};
    }

    @RequestMapping({ path: '/user/users/{id-team}', method: 'GET'})
    getUsers(@PathParam('id-team') idTeam: any) {
        return {users: this.userService.getUsersByIdTeam(idTeam)};
    }

    @RequestMapping({ path: '/user/update', method: 'PUT'})
    update(@Body('user') user: IUser) {
        return {success: this.userService.update(user)};
    }

    @RequestMapping({ path: '/user/delete/{id}', method: 'DELETE'})
    delete(@PathParam('id') id: any) {
        return {success: this.userService.delete(id)};
    }

    @RequestMapping({ path: '/user/authenticate', method: 'POST'})
    authenticate() {
        // TODO : Drissette :^)
        return this.userService.authenticate();
    }
}
