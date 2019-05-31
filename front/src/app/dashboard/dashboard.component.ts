import {Component, OnInit} from '@angular/core';
import {TeamService} from '../shared/team/team.service';
import {UserEntity} from '../shared/model/entity/user-entity';
import {AuthenticateService} from '../shared/authenticate/authenticate.service';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, Validators} from '@angular/forms';
import {Team} from '../shared/model/interface/team-interface';
import {TeamClass} from '../shared/model/class/team-class';
import {MemberService} from '../shared/member/member.service';
import {Member} from '../shared/model/interface/member-interface';
import {UserService} from '../shared/user/user.service';
import {User} from '../shared/model/interface/user-interface';
import {ResponseEntity} from '../shared/model/entity/response-entity';
import {Router} from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    private user: UserEntity;
    formTeam;
    teams: TeamClass[] = [];

    constructor(private teamService: TeamService,
                private memberService: MemberService,
                private userService: UserService,
                private authenticateService: AuthenticateService,
                private router: Router,
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

        this.user.team.forEach(idTeam => {
            this.teamService.getTeam(idTeam).subscribe((team: ResponseEntity<Team>) => {
                this.memberService.getTeamMembers(idTeam).subscribe((members: ResponseEntity<Member[]>) => {
                    this.userService.getUser(team.value.admin).subscribe((user: ResponseEntity<User>) => {
                        this.teams.push(new TeamClass(team.value.name, user.value, members.value));
                    });
                });
            });
        });
    }

  addTeam() {
    const team: Team = {name: this.formTeam.get('teamName').value, admin: this.user.id};
    this.teamService.createTeam(team).subscribe(
      (result: any) => {
          this.user.team.push(result);
          this.teams.push({
              name: this.formTeam.get('teamName').value,
              admin: this.user,
              members: [{
                  position: 1,
                  name: this.user.pseudo,
                  points: 0,
                  votes: []
              }]
          });
          this.toastService.success(
              'Création de la team ' + this.formTeam.get('teamName').value + '.',
              'Création team'
          );
      },
      () => {
          this.toastService.error('Une erreur est survenue, veuillez réessayer plus tard.', 'Création team');
      }
    );
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

    redirectJoinTeam(): void {
        this.router.navigateByUrl('/request');
    }
}
