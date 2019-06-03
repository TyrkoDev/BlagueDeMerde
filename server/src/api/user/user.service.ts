import {Console, Injectable} from 'tsunamy/core';
import {IUser} from '../mongo/schema/interface/iUser';
import {IUserModel, User} from '../mongo/schema/user';
import {AuthenticateService} from '../authenticate/authenticate.service';
import {ResponseEntity} from '../core/interface/responseEntity';

@Injectable()
export class UserService {
    private user: IUserModel;

    constructor() {
        this.user = new User();
    }

    async create(user: IUser): Promise<ResponseEntity> {
        // check if user already exist
        Console.Info('Check if user already exist');
        const isPresent = await this.user.userExist(user);

        if (isPresent) {
            Console.Err('User already exist');
            return {error: 409};
        }

        try {
            user.password = await AuthenticateService.hashPassword(user.password)
                .then((res: string | void) => {
                    if (!res) {
                        Console.Err('Hash retourné : ' + res);
                        throw new Error('Erreur lors du Hash');
                    }
                    return res;
                });
        } catch (e) {
            return {error: 500};
        }

        await User.create(user).then((res: IUserModel) => {
            Console.Info('User created : ' + res.pseudo);
        }).catch(reason => {
            Console.Err(reason);
        });
        return {code: 201};
    }

    async checkPseudoOrMailExist(info: string): Promise<ResponseEntity> {
        // check if pseudo or mail already exist
        Console.Info('Check if pseudo or mail already exist');
        const isPresent = await this.user.pseudoOrMailExist(info);

        if (isPresent) {
            Console.Err('Pseudo or mail already exist');
            return {error: 409};
        }

        return {code: 200};
    }

    async update(user: IUser): Promise<ResponseEntity> {
        const updateUser =  await User.updateOne({email: user.email}, user).then((res: IUserModel) => {
            Console.Info('User updated : ' + res.pseudo);
            return res;
        }).catch(reason => Console.Err(reason));

        return updateUser === undefined ? {error: 500} : {code: 200};
    }

    async getUser(id: any): Promise<ResponseEntity> {
        const userById = await User.findById(id, function(err, res) {
            if (err) {
                Console.Err('User not found : ' + id);
            }

            if (res) {
                Console.Info('User : ' + res.pseudo);
            }
            return res;
        });

        return userById === undefined ? {error: 204} : {code: 200, value: userById};
    }

    async getUsersFromTeam(idTeam: any): Promise<ResponseEntity> {
        const userByIdTeam = await User.find({team: idTeam}, function(err: any, res: any[]) {
            if (err) {
                Console.Err('Team users not found : ' + idTeam);
            }

            if (res) {
                Console.Info('Users found : ' + res.length);
            }
            return res;
        });

        return userByIdTeam === undefined ? {error: 404} : {code: 200, value: userByIdTeam};
    }

    async delete(id: string): Promise<ResponseEntity> {
        const deleted: any = await User.deleteOne({_id: id}, function(err: any) {
            if (err) {
                Console.Err('User not found : ' + id);
            }
        });

        return deleted.ok === 1 ? {code: 202} : {code: 500};
    }
}
