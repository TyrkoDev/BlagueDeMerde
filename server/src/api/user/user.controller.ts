import {Body, Controller, Guards, PathParam, RequestMapping} from 'tsunamy/core';
import {UserService} from './user.service';
import {IUser} from '../mongo/schema/interface/iUser';
import {ControllerTemplate} from '../core/controller/controllerTemplate';
import {AuthenticateService} from '../authenticate/authenticate.service';

@Controller()
export class UserController extends ControllerTemplate {

    constructor(private userService: UserService) {
        super(UserController);
    }

    @RequestMapping({path: '/user/hi', method: 'GET'})
    hi() {
        return super.hi();
    }

    @RequestMapping({path: '/user/create', method: 'POST'})
    async create(@Body() user: IUser) {
        return await this.userService.create(user);
    }

    @RequestMapping({path: '/user/check/{info}', method: 'GET'})
    async check(@PathParam('info') info: string) {
        return await this.userService.checkPseudoOrMailExist(info);
    }

    @Guards(AuthenticateService.isAuthenticate)
    @RequestMapping({path: '/user/{id}', method: 'GET'})
    async getUser(@PathParam('id') id: any) {
        return await this.userService.getUser(id);
    }

    @Guards(AuthenticateService.isAuthenticate)
    @RequestMapping({path: '/user/team/{id-team}', method: 'GET'})
    async getUsersFromTeam(@PathParam('id-team') idTeam: any) {
        return await this.userService.getUsersFromTeam(idTeam);
    }

    @Guards(AuthenticateService.isAuthenticate)
    @RequestMapping({path: '/user/update', method: 'PUT'})
    async update(@Body() user: IUser) {
        return await this.userService.update(user);
    }

    @Guards(AuthenticateService.isAuthenticate)
    @RequestMapping({path: '/user/delete/{id}', method: 'DELETE'})
    async delete(@PathParam('id') id: any) {
        return await this.userService.delete(id);
    }
}
