import {Injectable} from 'tsunamy/core';
import {User} from './mongo/schema/user';

@Injectable()
export class AppService {

    hi(): string {
        return 'Tsunamy';
    }

    create(): string {
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
}
