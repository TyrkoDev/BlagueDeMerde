import {Injectable, Console} from 'tsunamy/core';
import {AuthenticateEntity} from './models/authenticate-entity';
import {IUserModel, User} from '../mongo/schema/user';
import {AuthenticateResponse} from './models/authenticate-response';

import * as argon2 from 'argon2';
import fs from 'fs';
import * as path from 'path';
import * as jwt from 'jsonwebtoken';
import {IUser} from '../mongo/schema/interface/iUser';

@Injectable()
export class AuthenticateService {

    constructor() {
    }

    static async isAuthenticate(request: any): Promise<boolean> {
        Console.Info('Verification du token');
        const token = request.headers.authorization;
        if (token && token.startsWith('Bearer ')) {
            const hash = token.substr(7);
            let result: any = null;
            try {
                const filePath = path.join(__dirname, '../../certificate/secretKey.txt');
                const key = fs.readFileSync(filePath, 'utf8');
                jwt.verify(hash, key, (err: any, decoded: any) => {
                    if (err) {
                        Console.Err(err);
                        throw new Error('Erreur lors de la vérification du token');
                    }
                    result = decoded;
                });
            } catch (e) {
                Console.Err(e);
                return false;
            }
            const userFind = await User.findOne().or([{name: result.pseudo}, {pseudo: result.pseudo}])
                .where('email').equals(result.email)
                .where('lastConnection').equals(result.lastConnection)
                .then((resp: IUserModel | null) => resp)
                .catch((err: any) => Console.Err(err));

            return !!userFind;
        } else {
            Console.Err('Header authorization vide ou mal formé : ' + token);
            return false;
        }
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

    async authentication(authenticateEntity: AuthenticateEntity): Promise<AuthenticateResponse> {
        Console.Info('Recherche du user');
        const userFind = await User.findOne().or([{pseudo: authenticateEntity.login}, {email: authenticateEntity.login}])
            .then((resp: IUserModel | null) => resp);

        if (!userFind) {
            throw new Error('User ' + authenticateEntity.login + ' not found');
        }

        const isSame = await this.comparePassword(authenticateEntity.password, userFind.password);

        if (isSame) {
            const date = new Date().toISOString();
            let tokenGenerated = null;
            try {
                const filePath = path.join(__dirname, '../../certificate/secretKey.txt');
                const key = fs.readFileSync(filePath, 'utf8');
                tokenGenerated = jwt.sign(
                                {
                                    pseudo: userFind.pseudo,
                                    mail: userFind.email,
                                    lastConnection: date
                                },
                                key,
                                { algorithm: 'HS512', expiresIn: '1h'});
            } catch (e) {
                Console.Err(e);
                throw new Error('Erreur lors de la generation du token');
            }
            await User.updateOne({_id: userFind._id}, {lastConnection: date});
            const userFormated = this.formatUser(userFind);
            return {token: tokenGenerated, userCreated: userFormated};
        } else {
            throw new Error('Password not valid');
        }
    }

    private formatUser(user: IUserModel): IUser {
        return {
            id: user._id,
            name: user.name,
            firstName: user.firstName,
            email: user.email,
            password: '',
            pseudo: user.pseudo,
            team: user.team
        };
    }
}
