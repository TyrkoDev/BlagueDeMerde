import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/interface/user-interface';


@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) {
    }

    register(user: User): Observable<any> {
        return this.http.post('http://127.0.0.1:8088/api/user/create', user);
    }

    checkPseudoOrMail(info: string): Observable<any> {
        return this.http.get('http://127.0.0.1:8088/api/user/check/' + info);
    }
}
