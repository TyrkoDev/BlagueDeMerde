import {VoteEntity} from '../entity/vote-entity';

export interface Member {
    position: number;
    name: string;
    points: number;
    votes: VoteEntity[];
}
