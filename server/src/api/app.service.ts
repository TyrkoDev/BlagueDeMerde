import {Injectable} from 'tsunamy/core';
import {User} from './mongo/schema/user';
import {Team} from './mongo/schema/team';
import {Vote} from './mongo/schema/vote';

@Injectable()
export class AppService {

    hi(): string {
        return 'Tsunamy';
    }
}
