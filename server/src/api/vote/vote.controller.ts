import {Body, Controller, Guards, PathParam, RequestMapping} from 'tsunamy/core';
import {ControllerTemplate} from '../core/controller/controllerTemplate';
import {IVote} from '../mongo/schema/interface/iVote';
import {VoteService} from './vote.service';
import {AuthenticateService} from '../authenticate/authenticate.service';

@Controller()
export class VoteController extends ControllerTemplate {

    constructor(private voteService: VoteService) {
        super(VoteController);
    }

    @RequestMapping({path: '/vote/hi', method: 'GET'})
    hi() {
        return super.hi();
    }

    @Guards(AuthenticateService.isAuthenticate)
    @RequestMapping({path: '/vote', method: 'POST'})
    async vote(@Body() vote: IVote) {
        return await this.voteService.vote(vote);
    }

    @Guards(AuthenticateService.isAuthenticate)
    @RequestMapping({path: '/vote/{id}', method: 'GET'})
    async getVote(@PathParam('id') id: any) {
        return await this.voteService.getVote(id);
    }

    @Guards(AuthenticateService.isAuthenticate)
    @RequestMapping({path: '/vote/votes/{id-voter}/team/{id-team}', method: 'GET'})
    async getVotesGivenInTeam(@PathParam('id-voter') idVoter: any, @PathParam('id-team') idTeam: any) {
        return await this.voteService.getVotesGivenByIdVoter(idVoter, idTeam);
    }

    @Guards(AuthenticateService.isAuthenticate)
    @RequestMapping({path: '/vote/delete/{id}', method: 'DELETE'})
    async delete(@PathParam('id') id: any) {
        return await this.voteService.delete(id);
    }
}
