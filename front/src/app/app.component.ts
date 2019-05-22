import { Component } from '@angular/core';
import {UserService} from './shared/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'blagueDeMerde';
  user = null;

  constructor(private userService: UserService,
              private router: Router) {
      userService.subjectUser.subscribe( (user) => {
          this.user = user;
      });
  }

  logout() {
    this.userService.setCurrentUser(null);
    this.router.navigateByUrl('/login');
  }

}
