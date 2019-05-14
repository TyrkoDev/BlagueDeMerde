import {RequestMapping, PathParam, Controller, Body} from 'tsunamy/core';
import {TeamService} from './team.service';
import {ITeam} from '../mongo/schema/interface/iTeam';
import {ControllerTemplate} from '../core/controller/controllerTemplate';

@Controller()
export class TeamController extends ControllerTemplate {

    constructor( private teamService: TeamService) {
        super(TeamController);
    }

    @RequestMapping({ path: '/team/hi', method: 'GET'})
    hi() {
        return super.hi();
    }

    @RequestMapping({ path: '/team/create', method: 'POST'})
    async create(@Body() team: ITeam) {
        return {team: await this.teamService.create(team)};
    }

    @RequestMapping({ path: '/team/{id}', method: 'GET'})
    async getTeam(@PathParam('id') id: any) {
        return {team: await this.teamService.getTeam(id)};
    }

    @RequestMapping({ path: '/team/delete/{id}', method: 'DELETE'})
    async delete(@PathParam('id') id: any) {
        return {success: await this.teamService.delete(id)};
    }
}
