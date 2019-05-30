import { TyModule } from 'tsunamy/core';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { MongoModule } from '../mongo/mongo.module';

@TyModule({
    declarations: [MemberController],
    providers: [MemberService],
    imports: [MongoModule]
})
export class MemberModule { }
