import { Injectable } from '@angular/core';
import {UserService} from '../shared/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private userService: UserService) { }

  login(name: string, password: string) {
      this.userService.setCurrentUser( { name, password});
  }
}
