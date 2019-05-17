import {RequestMapping, PathParam, Controller, Body, Console} from 'tsunamy/core';
import { UserService } from './user.service';
import {IUser} from '../mongo/schema/interface/iUser';
import {ControllerTemplate} from '../core/controller/controllerTemplate';

@Controller()
export class UserController extends ControllerTemplate {

    constructor( private userService: UserService) {
        super(UserController);
    }

    @RequestMapping({ path: '/user/hi', method: 'GET'})
    hi() {
        return super.hi();
    }

    @RequestMapping({ path: '/user/create', method: 'POST'})
    async create(@Body() user: IUser) {
        try {
            await this.userService.create(user);
            return {code: 201};
        } catch (err) {
            Console.Err(err);
            return {error: 409};
        }
    }

    @RequestMapping({ path: '/user/{id}', method: 'GET'})
    async getUser(@PathParam('id') id: any) {
        return {user: await this.userService.getUser(id)};
    }

    @RequestMapping({ path: '/user/users/{id-team}', method: 'GET'})
    async getUsers(@PathParam('id-team') idTeam: any) {
        return {users: await this.userService.getUsersByIdTeam(idTeam)};
    }

    @RequestMapping({ path: '/user/update', method: 'PUT'})
    async update(@Body() user: IUser) {
        return {success: await this.userService.update(user)};
    }

    @RequestMapping({ path: '/user/delete/{id}', method: 'DELETE'})
    async delete(@PathParam('id') id: any) {
        return {success: await this.userService.delete(id)};
    }
}
