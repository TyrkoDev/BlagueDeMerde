import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {User} from './model/interface/user-interface';


@Injectable({
    providedIn: 'root'
})
export class UserService {

    currentUser = null;
    subjectUser = new BehaviorSubject(null);

    constructor(private http: HttpClient) {
    }

    getCurrentUser() {
        return this.currentUser;
    }

    setCurrentUser(user: User) {
        this.currentUser = user;
        this.subjectUser.next(user);
    }

    register(user: User): Observable<any> {
        return this.http.post('http://127.0.0.1:8088/api/user/create', user);
    }

    checkPseudo(pseudo: string): Observable<any> {
        return this.http.get('http://127.0.0.1:8088/api/user/check/' + pseudo);
    }

    checkMail(mail: string): Observable<any> {
        return this.http.get('http://127.0.0.1:8088/api/user/check/' + mail);
    }
}
