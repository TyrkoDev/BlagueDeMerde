import {Injectable} from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AuthenticateDTO} from '../model/interface/authenticate-dto';
import {AuthenticateResponse} from '../model/interface/authenticate-response';
import {UserEntity} from '../model/entity/user-entity';

@Injectable({
    providedIn: 'root'
})
export class AuthenticateService {
    subjectUser: BehaviorSubject<UserEntity> = new BehaviorSubject(null);

    constructor(private http: HttpClient) {}

    logout() {
        this.subjectUser.next(null);
        localStorage.removeItem('authenticate');
    }

    getCurrentUser(): UserEntity {
        const auth: AuthenticateResponse = this.getAuthenticate();
        if (auth) {
            return auth.userCreated;
        }
        return null;
    }

    getToken(): string {
        const auth: AuthenticateResponse = this.getAuthenticate();
        if (auth) {
            return auth.token;
        }
        return null;
    }

    setAuthenticate(authResp: AuthenticateResponse): void {
        this.subjectUser.next(authResp.userCreated);
        localStorage.setItem('authenticate', JSON.stringify(authResp));
    }

    authenticate(authenticateEntity: AuthenticateDTO): Observable<AuthenticateResponse> {
        return this.http.post<AuthenticateResponse>('http://127.0.0.1:8088/api/authenticate', authenticateEntity);
    }

    private getAuthenticate(): AuthenticateResponse {
        return JSON.parse(localStorage.getItem('authenticate'));
    }
}
