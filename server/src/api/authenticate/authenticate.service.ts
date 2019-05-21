import {Injectable, Console} from 'tsunamy/core';
import {AuthenticateEntity} from './models/authenticate-entity';
import * as argon2 from 'argon2';
import {IUserModel, User} from '../mongo/schema/user';
import fs from 'fs';
import * as path from 'path';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthenticateService {

    constructor() {
    }

    static async hashPassword(password: string): Promise<string | void> {
        Console.Info('Hash du mot de passe');
        return await argon2.hash(password, {hashLength: 50, timeCost: 5})
            .catch(err => Console.Err('Erreur lors du hash du mot de passe ! ' + err));
    }

    async comparePassword(password: string, hash: string): Promise<boolean> {
        Console.Info('Verification du mot de passe');
        return await argon2.verify(hash, password);
    }

    async authentication(authenticateEntity: AuthenticateEntity): Promise<string> {
        Console.Info('Recherche du user');
        const userFind = await User.findOne().or([{pseudo: authenticateEntity.login}, {email: authenticateEntity.login}])
            .then((resp: IUserModel | null) => resp);

        if (!userFind) {
            throw new Error('User ' + authenticateEntity.login + ' not found');
        }

        const isSame = await this.comparePassword(authenticateEntity.password, userFind.password);

        if (isSame) {
            try {
                const filePath = path.join(__dirname, '../../certificate/secretKey.txt');
                const key = fs.readFileSync(filePath, 'utf8');
                return jwt.sign({data: userFind.pseudo + userFind.email + userFind.createdAt}, key, { algorithm: 'HS512', expiresIn: '1h'});
            } catch (e) {
                Console.Err(e);
                throw new Error('Erreur lors de la generation du token');
            }
        } else {
            throw new Error('Password not valid');
        }
    }
}
