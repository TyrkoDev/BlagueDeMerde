import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {TeamComponent} from './dashboard/team/team.component';
import {RouterModule, Routes} from '@angular/router';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatOptionModule,
    MatSelectModule,
    MatTableModule,
    MatToolbarModule
} from '@angular/material';
import {UserService} from './shared/user/user.service';
import {TeamService} from './shared/team/team.service';
import {IsSignedInGuard} from './shared/isSignedIn.guard';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {AuthenticateService} from './shared/authenticate/authenticate.service';
import {ErrorInterceptor} from './shared/interceptors/errorInterceptor';
import {TokenInterceptor} from './shared/interceptors/tokenInterceptor';
import {MemberService} from './shared/member/member.service';
import {RequestService} from './shared/request/request.service';
import {RequestComponent} from './request/request.component';


const routes: Routes = [
    {
        path: '', component: DashboardComponent,
        canActivate: [
            IsSignedInGuard
        ]
    },
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'request', component: RequestComponent},
    {path: '**', redirectTo: ''}
];

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        DashboardComponent,
        RegisterComponent,
        TeamComponent,
        RequestComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(routes),
        ToastrModule.forRoot({maxOpened: 5, autoDismiss: true, enableHtml: true, progressBar: true}),
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
        HttpClientModule,
        ReactiveFormsModule,
        MatListModule,
        MatAutocompleteModule
    ],
    providers: [
        TeamService,
        UserService,
        AuthenticateService,
        MemberService,
        RequestService,
        HttpClient,
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
