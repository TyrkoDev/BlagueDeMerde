import {User} from '../interface/user-interface';
import {Member} from '../interface/member-interface';

export class TeamClass {
    name: string;
    admin: User;
    members: Member[];

    constructor(name: string, admin: User, members: Member[]) {
        this.name = name;
        this.admin = admin;
        this.members = members;
    }
}
