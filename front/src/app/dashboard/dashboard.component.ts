import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

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
  newMemberName = '';
  deleteMemberName;

  displayedColumns: string[] = ['position', 'name', 'points', 'actions'];

  constructor() {
  }

  ngOnInit() { }

  addPoints(element: any) {
    const index = this.teams[0].members.findIndex( (value) => value.name === element.name);
    this.teams[0].members[index].points = this.teams[0].members[index].points + 1;
  }
  addMember() {
    this.teams[0].members.push({ name: this.newMemberName, position: 0, points: 0 });
    console.log(this.teams);
  }
  removeMember() {
    const index = this.teams[0].members.findIndex( (value) => value.name === this.deleteMemberName);
    console.log('remove' , this.deleteMemberName);
  }

  addTeam() {
    this.teams.push({ name: this.newTeamName, members: [] });
  }

}
