import {Team} from '../interface/team-interface';

export interface TeamEntity extends Team {
    _id: string;
    createdAt: Date;
}
