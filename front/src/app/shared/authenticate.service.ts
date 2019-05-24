import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from './model/interface/user-interface';
import {HttpClient} from '@angular/common/http';
import {AuthenticateDTO} from './model/interface/authenticate-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private http: HttpClient) {}

  authenticate(authenticateEntity: AuthenticateDTO): Observable<User> {
    return this.http.post<User>('http://127.0.0.1:8088/api/authenticate', authenticateEntity);
  }
}
