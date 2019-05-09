import { TyModule } from 'tsunamy/core';
import { MongoModule } from '../mongo/mongo.module';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';

@TyModule({
    declarations: [TeamController],
    providers: [TeamService],
    imports: [MongoModule]
})
export class TeamModule { }
