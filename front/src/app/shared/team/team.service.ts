import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Team} from '../model/interface/team-interface';
import {ServiceClass} from '../model/class/service-class';

@Injectable({
  providedIn: 'root'
})
export class TeamService extends ServiceClass {

  createTeam(team: Team): Observable<any> {
    return this.post('http://127.0.0.1:8088/api/team/create', team);
  }

  becomeTeamMember(idTeam: string, idUser: string): Observable<any> {
    return this.put('http://127.0.0.1:8088/api/team/join/team/' + idTeam + '/user/' + idUser, null);
  }

  deleteTeamById(id: string): Observable<any> {
    return this.delete('http://127.0.0.1:8088/api/team/delete/' + id);
  }

  checkTeamName(name: string): Observable<any> {
    return this.get('http://127.0.0.1:8088/api/team/check/' + name);
  }
}
