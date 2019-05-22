import {Console, Injectable} from 'tsunamy/core';
import {ITeam} from '../mongo/schema/interface/iTeam';
import {ITeamModel, Team} from '../mongo/schema/team';
import {ResponseEntity} from '../core/interface/responseEntity';

@Injectable()
export class TeamService {
    private team: ITeamModel;

    constructor() {
        this.team = new Team();
    }

    async create(team: ITeam): Promise<ResponseEntity> {
        Console.Info('Check if team already exist');
        const isPresent = await this.team.teamExist(team);

        if (isPresent) {
            Console.Err('Team already exist');
            return {error: 409};
        }

        await Team.create(team)
            .then((res: ITeamModel) => Console.Info('Team created : ' + res.name))
            .catch(reason => Console.Err(reason));

        return {code: 201};
    }

    async getTeam(id: any): Promise<ResponseEntity> {
        const teamById = await Team.findById(id, function(err, res) {
            if (err) {
                Console.Err('Team not found : ' + id);
            }

            if (res) {
                Console.Info('Team : ' + res.name);
            }
            return res;
        });

        return teamById === undefined ? {error: 500} : {code: 200, value: teamById};
    }

    async delete(id: string): Promise<ResponseEntity> {
        const deleted: any = await Team.deleteOne({_id: id}, function(err: any) {
            if (err) {
                Console.Err('Team not found : ' + id);
            }
        });

        return deleted.ok === 1 ? {code: 202} : {code: 500};
    }
}
