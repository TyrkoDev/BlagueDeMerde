import {Document, Schema, Model, model} from 'mongoose';
import {IUser} from './interface/iUser';
import {Console} from 'tsunamy/core';

export interface IUserModel extends IUser, Document {
    hello(): string;
    create(): void;
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

UserSchema.methods.create = function(): void {
    this.save((err: any) => {
        if (err) {
            console.log(err);
        }
        Console.Info('Creation success');
    });
};

export const User: Model<IUserModel> = model<IUserModel>('user', UserSchema);
