import {Console, Injectable} from 'tsunamy/core';
import {IVote} from '../mongo/schema/interface/iVote';
import {IVoteModel, Vote} from '../mongo/schema/vote';
import {ResponseEntity} from '../core/interface/responseEntity';

@Injectable()
export class VoteService {

    async vote(vote: IVote): Promise<ResponseEntity> {
        await Vote.create(vote)
            .then((res: IVoteModel) => res)
            .catch(reason => Console.Err(reason));
        return {code: 201};
    }

    async getVote(id: any): Promise<ResponseEntity> {
        const voteById = await Vote.findById(id, function(err, res) {
            if (err) {
                Console.Err('User not found : ' + id);
            }

            return res;
        });

        return voteById === undefined ? {error: 404} : {code: 200, value: voteById};
    }

    async getVotesByIdVoter(idVoter: any): Promise<ResponseEntity> {
        const votes = await Vote.find({voter: idVoter}, function(err: any, res: any[]) {
            if (err) {
                Console.Err('Voter not found : ' + idVoter);
            }

            if (res) {
                Console.Info('Voter found, vote size : ' + res.length);
            }
            return res;
        });

        return votes === undefined ? {error: 404} : {code: 200, value: votes};
    }

    async delete(id: string): Promise<ResponseEntity> {
        const deleted: any = await Vote.deleteOne({_id: id}, function(err: any) {
            if (err) {
                Console.Err('Vote not found : ' + id);
            }
        });

        return deleted.ok === 1 ? {code: 202} : {code: 500};
    }
}
