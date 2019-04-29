import { TyModule } from 'tsunamy/core';
import { MongoController } from './mongo.controller';
import { MongoService } from './mongo.service';

@TyModule({
    declarations: [MongoController],
    providers: [MongoService]
})
export class MongoModule { }
