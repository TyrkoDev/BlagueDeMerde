import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser = null;
  subjectUser = new BehaviorSubject(null);

  constructor() { }

  getCurrentUser() {
   return this.currentUser;
  }

  setCurrentUser(user: any) {
      this.currentUser = user;
      this.subjectUser.next(user);
  }


}
