import {Console, Injectable} from 'tsunamy/core';
import {IUser} from '../mongo/schema/interface/iUser';
import {IUserModel, User} from '../mongo/schema/user';

@Injectable()
export class UserService {

    async create(user: IUser): Promise<IUserModel | void> {
        return await User.create(user).then((res: IUserModel) => {
            Console.Info('User created : ' + res.pseudo);
            return res;
        }).catch(reason => Console.Err(reason));
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

    delete(id: string): void {
        User.deleteOne({_id: id}, function(err: any) {
            if (err) {
                Console.Err('User not found : ' + id);
            }
        });
    }

    authenticate(): boolean {
        return true;
    }
}
