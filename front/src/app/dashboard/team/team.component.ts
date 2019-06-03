import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {TeamClass} from '../../shared/model/class/team-class';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  @Input() team: TeamClass;
  @Output() removeTeamEvent = new EventEmitter<string>();
  newMemberName = '';
  deleteMemberName;

  displayedColumns: string[] = ['position', 'name', 'points', 'actions'];

  constructor() {
  }

  ngOnInit() { }

  addPoints(element: any) {
    const index = this.team.members.findIndex( (value) => value.name === element.name);
    this.team.members[index].points = this.team.members[index].points + 1;
  }

  addMember() {
    const members = this.team.members.slice();
    // members.push({ name: this.newMemberName, position: 0, points: 0 });
    this.newMemberName = '';
    this.team.members = members;
  }

  removeMember() {
    const members = this.team.members.slice();
    const index = this.team.members.findIndex( (value) => value.name === this.deleteMemberName);
    members.splice(index, 1);
    this.team.members = members;
  }

  removeTeam() {
    this.removeTeamEvent.emit(this.team.name);
  }

}
