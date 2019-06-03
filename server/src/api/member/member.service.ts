import {Injectable} from 'tsunamy/core';
import {IUserModel} from '../mongo/schema/user';
import {ResponseEntity} from '../core/interface/responseEntity';
import {UserService} from '../user/user.service';
import {MemberDto} from '../core/dto/member-dto';
import {VoteService} from '../vote/vote.service';

@Injectable()
export class MemberService {

    constructor(private userService: UserService,
                private voteService: VoteService) {

    }

    async getMembersFromTeam(idTeam: any): Promise<ResponseEntity> {
        const userByIdTeam: ResponseEntity = await this.userService.getUsersFromTeam(idTeam);
        const users: IUserModel[] = userByIdTeam.value;
        const members = await this.mapMembers(users, idTeam);
        return Promise.all(members).then((membersList: MemberDto[]) => {
            membersList.sort((memberA, memberB) => memberA.points < memberB.points ? 1 : 0);
            membersList.forEach((member, index) => member.position = (index + 1));
            return membersList.length === 0 ? {error: 404} : {code: 200, value: membersList};
        });
    }

    private mapMembers(users: IUserModel[], idTeam: any): Promise<MemberDto>[] {
        return users.map(async user => {
            return await this.voteService.getVotesTakenByIdVoter(user._id, idTeam).then(votes => {
                const member: MemberDto = {
                    _id: user._id,
                    position: 0,
                    name: user.pseudo,
                    points: votes.value.length,
                    votes: votes.value
                };
                return member;
            });
        });
    }
}
