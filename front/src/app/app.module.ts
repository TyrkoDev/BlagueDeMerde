import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TeamComponent } from './dashboard/team/team.component';
import {RouterModule, Routes} from '@angular/router';
import {MatIconModule,
   MatButtonModule,
   MatToolbarModule,
   MatInputModule,
   MatTableModule,
   MatExpansionModule,
   MatOptionModule,
   MatSelectModule,
   MatMenuModule,
   MatFormFieldModule} from '@angular/material';
import {LoginService} from './login/login.service';
import {UserService} from './shared/user.service';
import {TeamService} from './shared/team.service';
import {IsSignedInGuard} from './shared/isSignedIn.guard';
import {HttpClient, HttpClientModule} from '@angular/common/http';

const routes: Routes = [
    { path: '', component: DashboardComponent,
        canActivate: [
            IsSignedInGuard
        ] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    TeamComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatExpansionModule,
    MatOptionModule,
    MatSelectModule,
    MatMenuModule,
    MatFormFieldModule,
    HttpClientModule
  ],
  providers: [
      LoginService,
      TeamService,
      UserService,
      HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
