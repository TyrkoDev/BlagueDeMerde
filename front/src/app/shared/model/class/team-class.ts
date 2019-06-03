import {User} from '../interface/user-interface';
import {MemberEntity} from '../entity/member-entity';

export class TeamClass {

    constructor(public name: string, public admin: User, public members: MemberEntity[], public _id?: string) {
    }
}
