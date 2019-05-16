import {Console, Injectable} from 'tsunamy/core';
import {IUser} from '../mongo/schema/interface/iUser';
import {IUserModel, User} from '../mongo/schema/user';
import {DeleteWriteOpResultObject} from 'mongodb';
import {AuthenticateService} from '../authenticate/authenticate.service';
import {Team} from '../mongo/schema/team';

@Injectable()
export class UserService {

    async create(user: IUser): Promise<void> {
        user.password = await AuthenticateService.hashPassword(user.password)
            .then((res: string | void) => {
                if (!res) {
                    Console.Err('Hash retourné : ' + res);
                    throw new Error('Erreur lors du Hash');
                }
                return res;
            });
        const userModel: IUserModel | void = await User.create(user).then((res: IUserModel) => {
            Console.Info('User created : ' + res.pseudo);
            Console.Info(res.toString());
            return res;
        }).catch(reason => {
            Console.Info('Coucou');
            Console.Err(reason);
        });
        Team.populate(userModel, {path: 'team'}, function(err, res: IUserModel) {
            Console.Info(userModel !== undefined ? userModel.toString() : '');
        });
    }

    async update(user: IUser): Promise<IUserModel | void> {
        return await User.updateOne({email: user.email}, user).then((res: IUserModel) => {
            Console.Info('User updated : ' + res.pseudo);
            return res;
        }).catch(reason => Console.Err(reason));
    }

    async getUser(id: any): Promise<IUserModel | null> {
        return await User.findById(id, function(err, res) {
            if (err) {
                Console.Err('User not found : ' + id);
            }

            if (res) {
                Console.Info('User : ' + res.pseudo);
            }
            return res;
        });
    }

    async getUsersByIdTeam(idTeam: any): Promise<IUserModel[] | null> {
        return await User.find({idTeam}, function(err: any, res: any[]) {
            if (err) {
                Console.Err('Team users not found : ' + idTeam);
            }

            if (res) {
                Console.Info('Users found : ' + res.length);
            }
            return res;
        });
    }

    async delete(id: string): Promise<DeleteWriteOpResultObject['result']> {
        return await User.deleteOne({_id: id}, function(err: any) {
            if (err) {
                Console.Err('User not found : ' + id);
            }
        });
    }
}
