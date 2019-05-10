import { TyModule } from 'tsunamy/core';
import { MongoModule } from '../mongo/mongo.module';
import { VoteController } from './vote.controller';
import { VoteService } from './vote.service';

@TyModule({
    declarations: [VoteController],
    providers: [VoteService],
    imports: [MongoModule]
})
export class VoteModule { }
