import {Console, Injectable} from 'tsunamy/core';
import {IVote} from '../mongo/schema/interface/iVote';
import {IVoteModel, Vote} from '../mongo/schema/vote';

@Injectable()
export class VoteService {

    async vote(vote: IVote): Promise<IVoteModel | void> {
        return await Vote.create(vote).then((res: IVoteModel) => {
            return res;
        }).catch(reason => Console.Err(reason));
    }

    async getVote(id: any): Promise<IVoteModel | null> {
        return await Vote.findById(id, function(err, res) {
            if (err) {
                Console.Err('User not found : ' + id);
            }

            return res;
        });
    }

    async getVotesByIdVoter(idVoter: any): Promise<IVoteModel[] | null> {
        return await Vote.find({voter: idVoter}, function(err: any, res: any[]) {
            if (err) {
                Console.Err('Voter not found : ' + idVoter);
            }

            if (res) {
                Console.Info('Voter found, vote size : ' + res.length);
            }
            return res;
        });
    }

    delete(id: string): void {
        Vote.deleteOne({_id: id}, function(err: any) {
            if (err) {
                Console.Err('Vote not found : ' + id);
            }
        });
    }
}
