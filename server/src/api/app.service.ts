import {Injectable} from 'tsunamy/core';
import {User} from './db/schema/user';

@Injectable()
export class AppService {

    constructor() {
    }

    hi(): string {
        return 'Tsunamy';
    }

    test(): string {
        const user = new User();
        user.create({
            createdAt: new Date(),
            name: 'Test',
            firstName: 'Test',
            password: 'Test',
            email: 'test@test.test',
            pseudo: 'Test',
            idTeam: 1
        });
        return 'Yo';
    }
}
