import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../model/interface/user-interface';
import {ServiceClass} from '../model/class/service-class';


@Injectable({
    providedIn: 'root'
})
export class UserService extends ServiceClass {

    register(user: User): Observable<any> {
        return this.post('http://127.0.0.1:8088/api/user/create', user);
    }

    checkPseudoOrMail(info: string): Observable<any> {
        return this.get('http://127.0.0.1:8088/api/user/check/' + info);
    }
}
