import {Document, Model, model, Schema} from 'mongoose';
import {IUser} from './interface/iUser';
import {Console} from 'tsunamy/core';

export interface IUserModel extends IUser, Document {
    hello(): string;

    userExist(user: IUser): Promise<boolean>;

    pseudoOrMailExist(info: string): Promise<boolean>;
}

export const UserSchema: Schema = new Schema({
    createdAt: {type: Date, default: Date.now},
    lastConnection: {type: Date, default: null},
    name: String,
    firstName: String,
    password: String,
    email: String,
    pseudo: String,
    team: [{
        type: Schema.Types.ObjectId,
        ref: 'Team'
    }]
});

UserSchema.pre('save', function(next) {
    const user: any = this;
    user.name = user.name.toLowerCase();
    user.firstName = user.firstName.toLowerCase();
    user.email = user.email.toLowerCase();
    next();
});

UserSchema.methods.userExist = async function(user: IUser): Promise<boolean> {
    const userFind = await User.findOne()
        .or([{pseudo: { $regex: user.pseudo, $options: '<i>' }}, {email: { $regex: user.email, $options: '<i>' }}])
        .then((resp: IUserModel | null) => resp)
        .catch((err: any) => Console.Err(err));

    return new Promise<boolean>(resolve => resolve(!!userFind));
};

UserSchema.methods.pseudoOrMailExist = async function(info: string): Promise<boolean> {
    const userFind = await User.findOne()
        .or([{pseudo: { $regex: info, $options: '<i>' }}, {email: { $regex: info, $options: '<i>' }}])
        .then((resp: IUserModel | null) => resp)
        .catch((err: any) => Console.Err(err));

    return new Promise<boolean>(resolve => resolve(!!userFind));
};

export const User: Model<IUserModel> = model<IUserModel>('user', UserSchema);
