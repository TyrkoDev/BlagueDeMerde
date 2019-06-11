import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {TeamClass} from '../../shared/model/class/team-class';
import {VoteService} from '../../shared/vote/vote.service';
import {Vote} from '../../shared/model/interface/vote-interface';
import {AuthenticateService} from '../../shared/authenticate/authenticate.service';
import {UserEntity} from '../../shared/model/entity/user-entity';
import {ResponseEntity} from '../../shared/model/entity/response-entity';
import {MemberEntity} from '../../shared/model/entity/member-entity';

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
  user: UserEntity;

  displayedColumns: string[] = ['position', 'name', 'points', 'actions'];

  constructor(private voteService: VoteService,
              private authenticateService: AuthenticateService) {
    this.user = this.authenticateService.getCurrentUser();
  }

  ngOnInit() { }

  addPoints(member: MemberEntity, team: TeamClass) {
    const vote: Vote = {
      idTeam: team._id,
      idVoter: this.user._id,
      idTargetUser: member._id,
      date: new Date()
    };

    this.voteService.vote(vote).subscribe((response: ResponseEntity<any>) => {
      this.team.members.forEach(userMember => {
        if (member._id === userMember._id) {
          member.points++;
        }
      });
    });
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
