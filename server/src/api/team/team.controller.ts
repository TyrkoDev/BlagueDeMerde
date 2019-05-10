import {RequestMapping, PathParam, Controller, Body, Console} from 'tsunamy/core';
import {TeamService} from './team.service';
import {ITeam} from '../mongo/schema/interface/iTeam';
import {ITeamModel} from '../mongo/schema/team';
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
        /**
         * Problème qualitatif :
         *  La méthode create du teamService s'execute forcement après la fin de cette fonction
         *  Peut importe les async/await que j'ai pu tester
         *  La réponse du serveur se fait donc avant que la promise ai pu se conclure
         *  ---> Impossible de renvoyer une donnée lorsque on utilise des callbacks
         */
        const val = await this.teamService.create(team)
            .then((value: ITeamModel | void) => {
                return value === undefined ? { error: 'Une erreur est survenue lors de la création de l\'équipe' } : value;
            })
            .catch(reason => {
                Console.Err(reason);
                return { error: 'Une erreur est survenue lors de la création de l\'équipe' };
            });

        Console.Info(val === undefined ? 'team undefined' : val.toString());
        return val.toString();
    }

    @RequestMapping({ path: '/team/{id}', method: 'GET'})
    getTeam(@PathParam('id') id: any) {
        return {team: this.teamService.getTeam(id)};
    }

    @RequestMapping({ path: '/team/update', method: 'PUT'})
    update(@Body('team') team: ITeam) {
        return {};
    }

    @RequestMapping({ path: '/team/delete/{id}', method: 'DELETE'})
    delete(@PathParam('id') id: any) {
        return {success: this.teamService.delete(id)};
    }
}
