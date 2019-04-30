import {ITeam} from './iTeam';

export interface IUser {
    createdAt: Date;
    name: string;
    firstName: string;
    password: string;
    email: string;
    pseudo: string;
    team: ITeam;
}
