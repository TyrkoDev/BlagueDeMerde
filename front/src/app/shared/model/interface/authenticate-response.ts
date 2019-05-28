import {UserEntity} from '../entity/user-entity';

export interface AuthenticateResponse {
    readonly token: string;
    readonly userCreated: UserEntity;
}
