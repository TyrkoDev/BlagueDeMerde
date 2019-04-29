import {Injectable, Console} from 'tsunamy/core';
import {User} from './db/schema/user';
import mongoose from 'mongoose';

@Injectable()
export class AppService {

    constructor() {
        mongoose.connect('mongodb://localhost:27017/bdm', {useNewUrlParser: true}).then((value: any) => {
            if (value) {
                Console.Info('Connected to db : ' + value.connections[0].name);
            } else {
                Console.Err('Connection error');
            }
        }).catch((err: any) => Console.Err(err));
    }

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
