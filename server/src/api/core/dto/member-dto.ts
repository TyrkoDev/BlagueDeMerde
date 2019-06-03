import {IVote} from '../../mongo/schema/interface/iVote';

export interface MemberDto {
    position: number;
    name: string;
    points: number;
    votes: IVote[]
}
