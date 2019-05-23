import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../shared/user.service';
import {User} from '../shared/model/interface/user-interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private name = '';
  private firstName = '';
  private password = '';
  private email = '';
  private pseudo = '';

  constructor(private router: Router,
              private userService: UserService) { }

  ngOnInit() { }

  register() {
    const user: User = {
      name: this.name,
      firstName: this.firstName,
      password: this.password,
      email: this.email,
      pseudo: this.pseudo,
      team: []
    };
    this.userService.register(user);
    this.router.navigateByUrl('/login');
  }
}
