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

  constructor() { }

  ngOnInit() { }

  addTeam() {
    this.teams.push({ name: this.newTeamName, members: [] });
    this.newTeamName = '';
  }
  removeTeamEvent(name) {
    const index = this.teams.findIndex( (value) => value.name === name);
    this.teams.splice(index, 1);
  }

}
