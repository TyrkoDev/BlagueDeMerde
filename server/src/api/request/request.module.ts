import { TyModule } from 'tsunamy/core';
import { MongoModule } from '../mongo/mongo.module';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';

@TyModule({
    declarations: [RequestController],
    providers: [RequestService],
    imports: [MongoModule]
})
export class RequestModule { }
