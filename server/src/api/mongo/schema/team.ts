import {Document, Schema, Model, model} from 'mongoose';
import {Console} from 'tsunamy/core';
import {ITeam} from './interface/iTeam';

export interface ITeamModel extends ITeam, Document {
    hello(): string;
    create(): void;
}

export const TeamSchema: Schema = new Schema({
    createdAt: { type: Date, default: Date.now },
    name: String
});

TeamSchema.methods.hello = function(): string {
    return this.name.trim();
};

TeamSchema.methods.create = function(): void {
    this.save((err: any) => {
        if (err) {
            console.log(err);
        }
        Console.Info('Creation success');
    });
};

export const Team: Model<ITeamModel> = model<ITeamModel>('team', TeamSchema);
