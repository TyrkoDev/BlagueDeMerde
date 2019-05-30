import {Console, Injectable} from 'tsunamy/core';
import {IUser} from '../mongo/schema/interface/iUser';
import {IUserModel, User} from '../mongo/schema/user';
import {AuthenticateService} from '../authenticate/authenticate.service';
import {ResponseEntity} from '../core/interface/responseEntity';
import {UserService} from '../user/user.service';
import {MemberDto} from '../core/dto/member-dto';
import {VoteService} from '../vote/vote.service';
import {IVoteModel} from '../mongo/schema/vote';

@Injectable()
export class MemberService {

    constructor(private userService: UserService,
                private voteService: VoteService) {

    }

    async getMembersFromTeam(idTeam: any): Promise<ResponseEntity> {
        const userByIdTeam: ResponseEntity = await this.userService.getUsersFromTeam(idTeam);
        const users: IUserModel[] = userByIdTeam.value;

        const members = await users.map(async user => {
            const votes: ResponseEntity = await this.voteService.getVotesTakenByIdVoter(user._id);
            const member: MemberDto = {
                name: user.pseudo,
                points: votes.value.length
            };

            return member;
        });

        return members.length === 0 ? {error: 404} : {code: 200, value: members};
    }
}
