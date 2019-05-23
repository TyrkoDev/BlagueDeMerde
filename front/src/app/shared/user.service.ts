import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {User} from './model/interface/user-interface';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser = null;
  subjectUser = new BehaviorSubject(null);

  constructor(private http: HttpClient) { }

  getCurrentUser() {
   return this.currentUser;
  }

  setCurrentUser(user: any) {
      this.currentUser = user;
      this.subjectUser.next(user);
  }

  register(user: User): void {
      this.http.post('http://localhost:8088/api/user/create', user)
          .subscribe((value: any) => value.code === 201);
  }
}
