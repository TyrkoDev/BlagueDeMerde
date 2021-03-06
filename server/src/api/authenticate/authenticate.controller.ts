import {Body, Console, Controller, RequestMapping, Response} from 'tsunamy/core';
import {AuthenticateService} from './authenticate.service';
import {ControllerTemplate} from '../core/controller/controllerTemplate';
import {AuthenticateEntity} from './models/authenticate-entity';

@Controller()
export class AuthenticateController extends ControllerTemplate {

    constructor(private authenticateService: AuthenticateService) {
        super(AuthenticateController);
    }

    @RequestMapping({path: '/authenticate/hi', method: 'GET'})
    hi() {
        return super.hi();
    }

    @RequestMapping({path: '/authenticate', method: 'POST'})
    async authentication(@Response() res: any, @Body() authenticateEntity: AuthenticateEntity) {
        try {
            return await this.authenticateService.authentication(authenticateEntity);
        } catch (e) {
            Console.Err(e);
            return {error: 401};
        }
    }
}
