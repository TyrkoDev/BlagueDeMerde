import { TyModule } from 'tsunamy/core';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongoModule } from '../mongo/mongo.module';

@TyModule({
    declarations: [UserController],
    providers: [UserService],
    imports: [MongoModule]
})
export class UserModule { }
