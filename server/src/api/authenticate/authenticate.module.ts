import { TyModule } from 'tsunamy/core';
import { AuthenticateController } from './authenticate.controller';
import { AuthenticateService } from './authenticate.service';

@TyModule({
    declarations: [AuthenticateController],
    providers: [AuthenticateService],
    imports: []
})
export class AuthenticateModule { }
