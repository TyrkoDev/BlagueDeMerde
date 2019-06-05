import {TeamEntity} from '../entity/team-entity';
import {UserEntity} from '../entity/user-entity';

export class RequestClass {
    constructor(public user: UserEntity, public team: TeamEntity, public _id?: string) {
    }
}
