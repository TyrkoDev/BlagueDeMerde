import {IVote} from '../../mongo/schema/interface/iVote';

export interface MemberDto {
    _id: any;
    position: number;
    name: string;
    points: number;
    votes: IVote[];
}
