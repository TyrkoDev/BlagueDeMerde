import {RequestMapping, PathParam, Controller, Body} from 'tsunamy/core';
import {ControllerTemplate} from '../core/controller/controllerTemplate';
import {IVote} from '../mongo/schema/interface/iVote';
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
        return {vote: await this.voteService.vote(vote)};
    }

    @RequestMapping({ path: '/vote/{id}', method: 'GET'})
    async getVote(@PathParam('id') id: any) {
        return {vote: await this.voteService.getVote(id)};
    }

    @RequestMapping({ path: '/vote/votes/{id-voter}', method: 'GET'})
    async getVotes(@PathParam('id-voter') idVoter: any) {
        return {votes: await this.voteService.getVotesByIdVoter(idVoter)};
    }

    @RequestMapping({ path: '/vote/delete/{id}', method: 'DELETE'})
    async delete(@PathParam('id') id: any) {
        return {success: await this.voteService.delete(id)};
    }
}
