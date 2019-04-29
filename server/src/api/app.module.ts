import { TyModule } from 'tsunamy/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongoModule} from './mongo/mongo.module';

@TyModule({
  declarations: [AppController],
  providers: [AppService],
  imports: [MongoModule]
})
export class AppModule { }
