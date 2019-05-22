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
   MatFormFieldModule} from '@angular/material';

const routes: Routes = [
    { path: '', component: DashboardComponent },
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
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
