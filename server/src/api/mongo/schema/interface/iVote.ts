import {IUser} from './iUser';

export interface IVote {
    voter: IUser;
    targetUser: IUser;
    dateVote: Date;
}
