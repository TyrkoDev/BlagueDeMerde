import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../shared/user.service';
import {User} from '../shared/model/interface/user-interface';
import {FormBuilder, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    formRegister;
    pseudoIsOK: boolean;
    mailIsOK: boolean;
    mailSearchDone: boolean;
    pseudoSearchDone: boolean;

    constructor(private router: Router,
                private userService: UserService,
                private formBuilder: FormBuilder,
                private toastr: ToastrService) {
        this.pseudoIsOK = true;
        this.mailIsOK = true;
        this.mailSearchDone = false;
        this.pseudoSearchDone = false;
    }

    ngOnInit() {
        this.formRegister = this.formBuilder.group({
            name: ['', [Validators.required]],
            firstName: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            pseudo: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.pattern('^(?=^.{8,12}$)(?=(.*[a-zA-Z]){2})(?=(.*[0-9]){2}).*$')]]
        });
    }

    register() {
        const user: User = {
            name: this.formRegister.get('name').value,
            firstName: this.formRegister.get('firstName').value,
            password: this.formRegister.get('password').value,
            email: this.formRegister.get('email').value,
            pseudo: this.formRegister.get('pseudo').value,
            team: []
        };
        this.userService.register(user).subscribe(
            () => {
                this.toastr.success('Votre compte a bien été créé !', 'Inscription');
                this.router.navigateByUrl('/login');
            },
            () => {
                this.toastr.error('Une erreur est survenue, veuillez réessayer plus tard.', 'Inscription');
            });
    }

    checkPseudo() {
        if (this.formRegister.get('pseudo').valid) {
            this.pseudoSearchDone = false;
            this.userService.checkPseudo(this.formRegister.get('pseudo').value).subscribe(
                () => {
                    this.pseudoIsOK = true;
                    this.pseudoSearchDone = true;
                },
                () => {
                    this.pseudoIsOK = false;
                    this.pseudoSearchDone = true;
                }
            );
        }
    }

    checkMail() {
        if (this.formRegister.get('email').valid) {
            this.mailSearchDone = false;
            this.userService.checkMail(this.formRegister.get('email').value).subscribe(
                () => {
                    this.mailIsOK = true;
                    this.mailSearchDone = true;
                },
                () => {
                    this.mailIsOK = false;
                    this.mailSearchDone = true;
                }
            );
        }
    }
}
