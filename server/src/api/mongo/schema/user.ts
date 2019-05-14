import {Document, Schema, Model, model} from 'mongoose';
import {IUser} from './interface/iUser';
import {Team} from './team';

export interface IUserModel extends IUser, Document {
    hello(): string;
}

export const UserSchema: Schema = new Schema({
    createdAt: { type: Date, default: Date.now },
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

UserSchema.methods.hello = function(): string {
    return (this.firstName.trim() + ' ' + this.name.trim());
};

export const User: Model<IUserModel> = model<IUserModel>('user', UserSchema);
