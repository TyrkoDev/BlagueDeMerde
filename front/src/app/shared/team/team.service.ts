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
    return this.http.post<any>('http://127.0.0.1:8088/api/team/all', team);
  }

  getTeam(id: string): Observable<TeamInterface> {
    return this.http.get<TeamInterface>('http://127.0.0.1:8088/api/team/' + id);
  }

  getTeams(): Observable<TeamInterface> {
    return this.http.get<TeamInterface>('http://127.0.0.1:8088/api/team/all');
  }

  deleteTeam(id: string): Observable<any> {
    return this.http.delete<any>('http://127.0.0.1:8088/api/team/delete/' + id);
  }
}
