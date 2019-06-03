import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../model/interface/user-interface';
import {ServiceClass} from '../model/class/service-class';
import {HttpClient} from '@angular/common/http';
import {ResponseEntity} from '../model/entity/response-entity';
import {UserEntity} from '../model/entity/user-entity';


@Injectable({
    providedIn: 'root'
})
export class UserService extends ServiceClass {

    constructor(protected httpClient: HttpClient) {
        super(httpClient);
    }

    register(user: User): Observable<ResponseEntity<any>> {
        return this.post(this.BASE_URL + '/user/create', user);
    }

    checkPseudoOrMail(info: string): Observable<ResponseEntity<any>> {
        return this.get(this.BASE_URL + '/user/check/' + info);
    }

    getUser(idUser: string): Observable<ResponseEntity<UserEntity>> {
        return this.get(this.BASE_URL + '/user/' + idUser);
    }
}
