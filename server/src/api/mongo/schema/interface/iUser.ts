import {InterfaceDTO} from '../../../core/interface/InterfaceDTO';

export interface IUser extends InterfaceDTO {
    name: string;
    firstName: string;
    password: string;
    email: string;
    pseudo: string;
    team: string[];
}
