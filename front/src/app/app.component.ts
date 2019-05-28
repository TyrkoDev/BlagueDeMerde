import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticateService} from './shared/authenticate/authenticate.service';
import {UserEntity} from './shared/model/entity/user-entity';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'blagueDeMerde';
  user: UserEntity;

  constructor(private authenticateService: AuthenticateService,
              private router: Router) {
    authenticateService.subjectUser.subscribe((user: UserEntity) => {
        this.user = user;
      });
  }

  ngOnInit(): void {
    if (!this.user) {
      this.user = this.authenticateService.getCurrentUser();
    }
  }

  logout() {
    this.authenticateService.logout();
    this.router.navigateByUrl('/login');
  }

}
