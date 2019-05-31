import {Body, Controller, Guards, PathParam, RequestMapping} from 'tsunamy/core';
import {ControllerTemplate} from '../core/controller/controllerTemplate';
import {RequestService} from './request.service';
import {AuthenticateService} from '../authenticate/authenticate.service';
import {IRequest} from '../mongo/schema/interface/iRequest';

@Controller()
export class RequestController extends ControllerTemplate {

    constructor(private requestService: RequestService) {
        super(RequestController);
    }

    @RequestMapping({path: '/vote/hi', method: 'GET'})
    hi() {
        return super.hi();
    }

    @Guards(AuthenticateService.isAuthenticate)
    @RequestMapping({path: '/request', method: 'POST'})
    async request(@Body() request: IRequest) {
        return await this.requestService.askToJoin(request);
    }

    @Guards(AuthenticateService.isAuthenticate)
    @RequestMapping({path: '/request/user/{id}', method: 'GET'})
    async getRequestByIdUser(@PathParam('id') idUser: any) {
        return await this.requestService.getRequestByIdUser(idUser);
    }

    @Guards(AuthenticateService.isAuthenticate)
    @RequestMapping({path: '/request/team/{id}', method: 'GET'})
    async getRequestByIdTeam(@PathParam('id') idTeam: any) {
        return await this.requestService.getRequestByIdTeam(idTeam);
    }

    @Guards(AuthenticateService.isAuthenticate)
    @RequestMapping({path: '/request/delete/{id}', method: 'DELETE'})
    async delete(@PathParam('id') id: any) {
        return await this.requestService.delete(id);
    }
}
