import {Document, Schema, Model, model} from 'mongoose';
import {IUser} from './interface/iUser';

export interface IUserModel extends IUser, Document {
    hello(): string;

    create(user: IUser): void;
}

export const UserSchema: Schema = new Schema({
    createdAt: Date,
    name: String,
    firstName: String,
    password: String,
    email: String,
    pseudo: String,
    idTeam: Number
});

UserSchema.methods.hello = function(): string {
    return (this.firstName.trim() + ' ' + this.name.trim());
};

export const User: Model<IUserModel> = model<IUserModel>('User', UserSchema);
