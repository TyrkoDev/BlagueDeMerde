import {Console, Injectable} from 'tsunamy/core';
import {ITeam} from '../mongo/schema/interface/iTeam';
import {ITeamModel, Team} from '../mongo/schema/team';
import {DeleteWriteOpResultObject} from 'mongodb';

@Injectable()
export class TeamService {

    async create(team: ITeam): Promise<ITeamModel | void> {
        return await Team.create(team).then((res: ITeamModel) => {
            Console.Info('Team created : ' + res.name);
            return res;
        }).catch(reason => Console.Err(reason));
    }

    async getTeam(id: any): Promise<ITeamModel | null> {
        return await Team.findById(id, function(err, res) {
            if (err) {
                Console.Err('Team not found : ' + id);
            }

            if (res) {
                Console.Info('Team : ' + res.name);
            }
            return res;
        });
    }

    async delete(id: string): Promise<DeleteWriteOpResultObject['result']> {
        return await Team.deleteOne({_id: id}, function(err: any) {
            if (err) {
                Console.Err('Team not found : ' + id);
            }
        });
    }
}
