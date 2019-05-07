import {Console, Injectable} from 'tsunamy/core';
import {IUser} from '../mongo/schema/interface/iUser';
import {IUserModel, User} from '../mongo/schema/user';

@Injectable()
export class UserService {
    hi(): any {
        return {
            controller: 'User'
        };
    }

    async create(user: IUser): Promise<IUserModel | void> {
        return await User.create(user).then((res: IUserModel) => {
            Console.Info('User created : ' + res.pseudo);
            return res;
        }).catch(reason => Console.Err(reason));
    }

    update(user: IUser): boolean {
        return true;
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

    getUsers(param: any): IUser[] {
        return [];
    }

    delete(id: any): boolean {
        return false;
    }

    authenticate(): boolean {
        return true;
    }
}
