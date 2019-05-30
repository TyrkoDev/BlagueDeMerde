import {User} from '../interface/user-interface';
import {Member} from '../interface/member-interface';

export class TeamClass {
    name: string;
    admin: User;
    members: Member[];
}
