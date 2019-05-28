import { Component, OnInit } from '@angular/core';
import {TeamService} from '../shared/team/team.service';
import {UserService} from '../shared/user/user.service';
import {UserEntity} from '../shared/model/entity/user-entity';
import {TeamInterface} from '../shared/model/interface/team-interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private user: UserEntity;
  teams = [
    {
      name: 'Distrib',
      members: [{
        position: 1,
        name: 'Driss',
        points: 7
      }]
    }
  ];
  newTeamName = '';

  constructor(private teamService: TeamService,
              private userService: UserService) {
    userService.subjectUser.subscribe( (user) => {
      this.user = user;
    });
  }

  ngOnInit() {  }

  addTeam() {
    this.teamService.createTeam({name: this.newTeamName}).subscribe((result: any) => {
      this.user.team.push(result);
      console.log(this.user);
    });

    this.teams.push({ name: this.newTeamName, members: [] });
    this.newTeamName = '';
  }

  becomeTeamMember(idTeam: string) {
      this.teamService.becomeTeamMember(idTeam, this.user.id).subscribe((response: any) => {
        console.log(response.code);
      });
  }

  removeTeamEvent(name) {
    const index = this.teams.findIndex( (value) => value.name === name);
    this.teams.splice(index, 1);
  }

}
