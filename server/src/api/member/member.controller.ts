import {Body, Controller, Guards, PathParam, RequestMapping} from 'tsunamy/core';
import {ControllerTemplate} from '../core/controller/controllerTemplate';
import {AuthenticateService} from '../authenticate/authenticate.service';
import {MemberService} from './member.service';

@Controller()
export class MemberController extends ControllerTemplate {

    constructor(private memberService: MemberService) {
        super(MemberController);
    }

    @RequestMapping({path: '/member/hi', method: 'GET'})
    hi() {
        return super.hi();
    }

    @Guards(AuthenticateService.isAuthenticate)
    @RequestMapping({path: '/member/team/{id-team}', method: 'GET'})
    async getMembersFromTeam(@PathParam('id-team') idTeam: any) {
        return await this.memberService.getMembersFromTeam(idTeam);
    }
}
