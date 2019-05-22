import {Document, Schema, Model, model} from 'mongoose';
import {Console} from 'tsunamy/core';
import {IVote} from './interface/iVote';
import {ITeam} from './interface/iTeam';
import {ITeamModel, Team} from './team';

export interface IVoteModel extends IVote, Document {
    vote(): void;
}

export const VoteSchema: Schema = new Schema({
    voter: [{type: Schema.Types.ObjectId, ref: 'User'}],
    targetUser: [{type: Schema.Types.ObjectId, ref: 'User'}],
    dateVote: Date
});

VoteSchema.methods.vote = function(): void {
    this.save((err: any) => {
        if (err) {
            console.log(err);
        }
        Console.Info('Creation success');
    });
};

export const Vote: Model<IVoteModel> = model<IVoteModel>('vote', VoteSchema);
