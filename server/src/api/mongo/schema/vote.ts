import {Document, Model, model, Schema} from 'mongoose';
import {IVote} from './interface/iVote';

export interface IVoteModel extends IVote, Document {
    vote(): void;
}

export const VoteSchema: Schema = new Schema({
    idTeam: {type: Schema.Types.ObjectId, ref: 'Team'},
    idVoter: {type: Schema.Types.ObjectId, ref: 'User'},
    idTargetUser: {type: Schema.Types.ObjectId, ref: 'User'},
    dateVote: {type: Date, default: Date.now()}
});

export const Vote: Model<IVoteModel> = model<IVoteModel>('vote', VoteSchema);
