import {Document, Model, model, Schema} from 'mongoose';
import {ITeam} from './interface/iTeam';
import {Console} from 'tsunamy/core';

export interface ITeamModel extends ITeam, Document {
    teamExist(teamName: string): Promise<boolean>;
}

export const TeamSchema: Schema = new Schema({
    createdAt: { type: Date, default: Date.now },
    name: String,
    admin: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

TeamSchema.methods.teamExist = async function(teamName: string): Promise<boolean> {
    const teamFind = await Team.findOne().or([{name: teamName}])
        .then((resp: ITeamModel | null) => resp)
        .catch((err: any) => Console.Err(err));

    return new Promise<boolean>(resolve => resolve(!!teamFind));
};

export const Team: Model<ITeamModel> = model<ITeamModel>('team', TeamSchema);
