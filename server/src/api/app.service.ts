import {Injectable} from 'tsunamy/core';
import {User} from './mongo/schema/user';
import {Team} from './mongo/schema/team';
import {Vote} from './mongo/schema/vote';

@Injectable()
export class AppService {

    hi(): string {
        return 'Tsunamy';
    }

    createUser(): string {
        const user = new User({
            createdAt: new Date(),
            name: 'Test',
            firstName: 'Test',
            password: 'Test',
            email: 'test@test.test',
            pseudo: 'Test',
            idTeam: 1
        });

        user.create();
        return 'Created';
    }

    createVote(): string {
        const vote = new Vote({
            idVoter: 1,
            idTargetUser: 2,
            dateVote: new Date()
        });

        vote.vote();
        return 'Created';
    }

    createTeam(): string {
        const team = new Team({
            createdAt: new Date(),
            name: 'Thug team'
        });

        team.create();
        return 'Created';
    }
}
