import {Console, Injectable} from 'tsunamy/core';
import {ITeam} from '../mongo/schema/interface/iTeam';
import {ITeamModel, Team} from '../mongo/schema/team';
import {ResponseEntity} from '../core/interface/responseEntity';
import {UserService} from '../user/user.service';
import {IUser} from '../mongo/schema/interface/iUser';

@Injectable()
export class TeamService {
    private team: ITeamModel;

    constructor(private userService: UserService) {
        this.team = new Team();
    }

    async create(team: ITeam): Promise<ResponseEntity> {
        Console.Info('Check if team already exist');
        const isPresent = await this.team.teamExist(team.name);

        if (isPresent) {
            Console.Err('Team already exist');
            return {error: 409};
        }

        const teamCreated = await Team.create(team)
            .then((res: ITeamModel) => {
                Console.Info('Team created : ' + res.name);
                return res;
            })
            .catch(reason => Console.Err(reason));

        return {code: 201, value: teamCreated};
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

        return teamById === undefined ? {error: 204} : {code: 200, value: teamById};
    }

    async becomeTeamMember(idTeam: string, idUser: string): Promise<ResponseEntity> {
        const teamToJoin: ResponseEntity = await this.getTeam(idTeam);
        const userMemberResponseEntity: ResponseEntity = await this.userService.getUser(idUser);
        const userMember: IUser = userMemberResponseEntity.value;

        userMember.team.push(teamToJoin.value);
        return await this.userService.update(userMember);
    }

    async delete(id: string): Promise<ResponseEntity> {
        const deleted: any = await Team.deleteOne({_id: id}, function(err: any) {
            if (err) {
                Console.Err('Team not found : ' + id);
            }
        });

        return deleted.ok === 1 ? {code: 202} : {code: 500};
    }

    async checkTeamNameExist(name: string): Promise<ResponseEntity> {
        Console.Info('Check if team ' + name + ' already exist');
        const isPresent = await this.team.teamExist(name);

        if (isPresent) {
            Console.Err('Team already exist');
            return {error: 409};
        }
        return {code: 200};
    }
}
