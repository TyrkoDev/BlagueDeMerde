import {Document, Model, model, Schema} from 'mongoose';
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

export const Team: Model<ITeamModel> = model<ITeamModel>('team', TeamSchema);
