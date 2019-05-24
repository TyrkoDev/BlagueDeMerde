import {Body, Controller, Guards, PathParam, RequestMapping} from 'tsunamy/core';
import {TeamService} from './team.service';
import {ITeam} from '../mongo/schema/interface/iTeam';
import {ControllerTemplate} from '../core/controller/controllerTemplate';
import {AuthenticateService} from '../authenticate/authenticate.service';

@Controller()
export class TeamController extends ControllerTemplate {

    constructor(private teamService: TeamService) {
        super(TeamController);
    }

    @RequestMapping({path: '/team/hi', method: 'GET'})
    hi() {
        return super.hi();
    }

    @Guards(AuthenticateService.isAuthenticate)
    @RequestMapping({path: '/team/create', method: 'POST'})
    async create(@Body() team: ITeam) {
        return await this.teamService.create(team);
    }

    @Guards(AuthenticateService.isAuthenticate)
    @RequestMapping({path: '/team/{id}', method: 'GET'})
    async getTeam(@PathParam('id') id: any) {
        return await this.teamService.getTeam(id);
    }

    @Guards(AuthenticateService.isAuthenticate)
    @RequestMapping({path: '/team/delete/{id}', method: 'DELETE'})
    async delete(@PathParam('id') id: any) {
        return await this.teamService.delete(id);
    }
}
