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
            name: 'Thug',
            firstName: 'Driss',
            password: 'test',
            email: 'test@test.test',
            pseudo: 'Drisette',
        });

        const team = new Team({
            createdAt: new Date(),
                name: 'Les bandits'
        });
        team.create();

        user.team = team;
        user.create();
        return 'Created';
    }

    createVote(): string {
        User.findOne({pseudo: 'Drisette'}, function(error: any, user: any) {
            const vote = new Vote({
                dateVote: new Date()
            });

            vote.voter = user;
            vote.vote();
        });

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
