import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Team} from '../model/interface/team-interface';
import {ServiceClass} from '../model/class/service-class';
import {HttpClient} from '@angular/common/http';
import {ResponseEntity} from '../model/entity/response-entity';

@Injectable({
  providedIn: 'root'
})
export class TeamService extends ServiceClass {

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  createTeam(team: Team): Observable<any> {
    return this.post(this.BASE_URL + '/team/create', team);
  }

  getTeam(idTeam: string): Observable<ResponseEntity<Team>> {
    return this.get(this.BASE_URL + '/team/' + idTeam);
  }

  becomeTeamMember(idTeam: string, idUser: string): Observable<any> {
    return this.put(this.BASE_URL + '/team/join/team/' + idTeam + '/user/' + idUser, null);
  }

  deleteTeamById(id: string): Observable<any> {
    return this.delete(this.BASE_URL + '/team/delete/' + id);
  }

  checkTeamName(name: string): Observable<any> {
    return this.get(this.BASE_URL + '/team/check/' + name);
  }
}
