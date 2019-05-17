import {Body, Controller, RequestMapping} from 'tsunamy/core';
import {AuthenticateService} from './authenticate.service';
import {ControllerTemplate} from '../core/controller/controllerTemplate';
import {AuthenticateEntity} from './models/authenticate-entity';

@Controller()
export class AuthenticateController extends ControllerTemplate {

    constructor( private authenticateService: AuthenticateService) {
        super(AuthenticateController);
    }

    @RequestMapping({ path: '/authenticate/hi', method: 'GET'})
    hi() {
        return super.hi();
    }

    @RequestMapping({ path: '/authenticate', method: 'POST'})
    async authentication(@Body() authenticateEntity: AuthenticateEntity) {
        return {error: 403, message: 'Une erreur est survenue !'};
    }
}
