import {IUser} from './iUser';
import {InterfaceDTO} from '../../../core/interface/InterfaceDTO';

export interface IVote extends InterfaceDTO {
    voter: IUser;
    targetUser: IUser;
    dateVote: Date;
}
