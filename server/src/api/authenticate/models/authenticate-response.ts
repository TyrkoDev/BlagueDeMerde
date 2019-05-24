import {IUser} from '../../mongo/schema/interface/iUser';

export interface AuthenticateResponse {
    readonly token: string;
    readonly userCreated: IUser;
}
