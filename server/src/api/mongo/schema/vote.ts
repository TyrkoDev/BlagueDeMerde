import {Document, Schema, Model, model} from 'mongoose';
import {Console} from 'tsunamy/core';
import {IVote} from './interface/iVote';

export interface IVoteModel extends IVote, Document {
    hello(): string;
    vote(): void;
}

export const VoteSchema: Schema = new Schema({
    idVoter: Number,
    idTargetUser: Number,
    dateVote: Date
});

VoteSchema.methods.hello = function(): string {
    return ('[' + this.dateVote.toLocaleDateString() + '] : '
        + this.idVoter + ' a décidé que la blague de '
        + this.idTargetUser + ' était qualifié de merde');
};

VoteSchema.methods.vote = function(): void {
    this.save((err: any) => {
        if (err) {
            console.log(err);
        }
        Console.Info('Creation success');
    });
};

export const Vote: Model<IVoteModel> = model<IVoteModel>('vote', VoteSchema);
