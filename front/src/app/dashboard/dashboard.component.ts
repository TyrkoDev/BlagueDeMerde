import {Component, OnInit} from '@angular/core';
import {TeamService} from '../shared/team/team.service';
import {UserEntity} from '../shared/model/entity/user-entity';
import {AuthenticateService} from '../shared/authenticate/authenticate.service';
import {TeamInterface} from '../shared/model/interface/team-interface';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    private user: UserEntity;
    formTeam;
    teams = [];

    constructor(private teamService: TeamService,
                private authenticateService: AuthenticateService,
                private toastService: ToastrService,
                private formBuilder: FormBuilder) {
        authenticateService.subjectUser.subscribe((user: UserEntity) => {
            this.user = user;
        });
    }

    ngOnInit() {
        if (!this.user) {
            this.user = this.authenticateService.getCurrentUser();
        }
        this.formTeam = this.formBuilder.group({
            teamName: ['', [Validators.required]]
        });
    }

  addTeam() {
    this.teamService.createTeam({name: this.newTeamName, admin: this.user.id}).subscribe((result: any) => {
      this.user.team.push(result);
      console.log(this.user);
    });

    this.teams.push({ name: this.newTeamName, members: [] });
    this.newTeamName = '';
    // const team: TeamInterface = {name: this.formTeam.get('teamName').value};
    // this.teamService.createTeam(team).subscribe(
    //   (result: any) => {
    //       this.user.team.push(result);
    //       this.teams.push({
    //           name: this.formTeam.get('teamName').value,
    //           members: [{
    //               position: 1,
    //               name: this.user.pseudo,
    //               points: 0
    //           }]
    //       });
    //       this.toastService.success(
    //           'Création de la team ' + this.formTeam.get('teamName').value + '.',
    //           'Création team'
    //       );
    //   },
    //   () => {
    //       this.toastService.error('Une erreur est survenue, veuillez réessayer plus tard.', 'Création team');
    //   }
    // );
  }

    becomeTeamMember(idTeam: string) {
        this.teamService.becomeTeamMember(idTeam, this.user.id).subscribe((response: any) => {
            console.log(response.code);
        });
    }

    removeTeamEvent(name) {
        const index = this.teams.findIndex((value) => value.name === name);
        this.teams.splice(index, 1);
    }

    checkIfTeamNameExist() {
        if (this.formTeam.get('teamName').valid) {
            this.teamService.checkTeamName(this.formTeam.get('teamName').value).subscribe(
                () => {
                    this.formTeam.get('teamName').setErrors(null);
                },
                () => {
                    this.formTeam.get('teamName').setErrors({'notAvailable': true});
                }
            );
        }
    }
}
