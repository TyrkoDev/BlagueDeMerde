import {RequestMapping, PathParam, Controller, Body, Console} from 'tsunamy/core';
import {ControllerTemplate} from '../core/controller/controllerTemplate';
import {IVote} from '../mongo/schema/interface/iVote';
import {IVoteModel} from '../mongo/schema/vote';
import {VoteService} from './vote.service';

@Controller()
export class VoteController extends ControllerTemplate {

    constructor( private voteService: VoteService) {
        super(VoteController);
    }

    @RequestMapping({ path: '/vote/hi', method: 'GET'})
    hi() {
        return super.hi();
    }

    @RequestMapping({ path: '/vote', method: 'POST'})
    async vote(@Body() vote: IVote) {
        /**
         * Problème qualitatif :
         *  La méthode create du userService s'execute forcement après la fin de cette fonction
         *  Peut importe les async/await que j'ai pu tester
         *  La réponse du serveur se fait donc avant que la promise ai pu se conclure
         *  ---> Impossible de renvoyer une donnée lorsque on utilise des callbacks
         */
        const val = await this.voteService.vote(vote)
            .then((value: IVoteModel | void) => {
                return value === undefined ? { error: 'Une erreur est survenue lors du vote' } : value;
            })
            .catch(reason => {
                Console.Err(reason);
                return { error: 'Une erreur est survenue lors du vote' };
            });

        Console.Info(val === undefined ? 'vote undefined' : val.toString());
        return val.toString();
    }

    @RequestMapping({ path: '/vote/{id}', method: 'GET'})
    getVote(@PathParam('id') id: any) {
        return {vote: this.voteService.getVote(id)};
    }

    @RequestMapping({ path: '/vote/votes/{id-voter}', method: 'GET'})
    getVotes(@PathParam('id-voter') idVoter: any) {
        return {votes: this.voteService.getVotesByIdVoter(idVoter)};
    }

    @RequestMapping({ path: '/vote/delete/{id}', method: 'DELETE'})
    delete(@PathParam('id') id: any) {
        return {success: this.voteService.delete(id)};
    }
}
