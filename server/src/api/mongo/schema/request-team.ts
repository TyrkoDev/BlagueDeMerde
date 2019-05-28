import {Document, Model, model, Schema} from 'mongoose';
import {IRequest} from './interface/iRequest';
import {Console} from 'tsunamy/core';

export interface IRequestModel extends IRequest, Document {
    askToJoin(request: IRequest): Promise<boolean>;
}

export const RequestTeamSchema: Schema = new Schema({
    idTeam: {type: Schema.Types.ObjectId, ref: 'Team'},
    idUser: {type: Schema.Types.ObjectId, ref: 'User'},
    date: {type: Date, default: Date.now()}
});

RequestTeamSchema.methods.alreadyAsked = async function(request: IRequest) {
    const requestFind = await RequestTeam.findOne().and([{idTeam: request.idTeam}, {idUser: request.idUser}])
        .then((resp: IRequestModel | null) => resp)
        .catch((err: any) => Console.Err(err));

    return new Promise<boolean>(resolve => resolve(!!requestFind));
};
export const RequestTeam: Model<IRequestModel> = model<IRequestModel>('requestTeam', RequestTeamSchema);
