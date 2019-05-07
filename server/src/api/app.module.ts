import { TyModule } from 'tsunamy/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoModule } from './mongo/mongo.module';
import { UserModule } from './user/user.module';

@TyModule({
  declarations: [AppController],
  providers: [AppService],
  imports: [MongoModule, UserModule]
})
export class AppModule { }
