import {Injectable, Console} from 'tsunamy/core';
import {AuthenticateEntity} from './models/authenticate-entity';
import * as argon2 from 'argon2';

@Injectable()
export class AuthenticateService {

    constructor() {
    }

    static async hashPassword(password: string): Promise<string | void> {
        Console.Info('Hash du mot de passe');
        return await argon2.hash(password, {hashLength: 50, timeCost: 5})
            .catch(err => Console.Err('Erreur lors du hash du mot de passe ! \n' + err));
    }

    async comparePassword(password: string, hash: string): Promise<string | null> {
        return null;
    }

    async authentication(authenticateEntity: AuthenticateEntity): Promise<string | null> {
        return null;
    }
}
