import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticateService} from './authenticate/authenticate.service';

@Injectable({
    providedIn: 'root'
})
export class IsSignedInGuard implements CanActivate {

    constructor(private router: Router,
                private authenticateService: AuthenticateService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const isLogin = this.authenticateService.getCurrentUser() !== null;
        if (!isLogin) {
            this.router.navigateByUrl('/login');
        }
        return isLogin;
    }

}
