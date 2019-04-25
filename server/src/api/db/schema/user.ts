import {Document, Schema, Model, model} from 'mongoose';
import {IUser} from './interface/iUser';

export interface IUserModel extends IUser, Document {
    hello(): string;

    create(user: IUser): void;
}

export const UserSchema: Schema = new Schema({
    name: String,
    firstName: String,
    password: String,
    email: String,
    pseudo: String,
    idEquipe: Number
});

UserSchema.methods.hello = function(): string {
    return (this.firstName.trim() + ' ' + this.name.trim());
};

UserSchema.methods.create = (user: IUser): void => {
    console.log(user);
};

export const User: Model<IUserModel> = model<IUserModel>('User', UserSchema);
