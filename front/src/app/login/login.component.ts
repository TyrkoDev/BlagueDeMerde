import { Component, OnInit } from '@angular/core';
import {LoginService} from './login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  name: string;
  password: string;

  constructor(private loginService: LoginService,
              private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.loginService.login(this.name, this.password);
    this.router.navigateByUrl('/');
  }

}
