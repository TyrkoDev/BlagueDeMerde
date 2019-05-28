import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TeamInterface} from '../model/interface/team-interface';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) { }

  createTeam(team: TeamInterface): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8088/api/team/create', team);
  }

  becomeTeamMember(idTeam: string, idUser: string): Observable<any> {
    return this.http.put<any>('http://127.0.0.1:8088/api/team/join/team/' + idTeam + '/user/' + idUser, null);
  }

  deleteTeamById(id: string): Observable<any> {
    return this.http.delete<any>('http://127.0.0.1:8088/api/team/delete/' + id);
  }

  checkTeamName(name: string): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:8088/api/team/check/' + name);
  }
}
