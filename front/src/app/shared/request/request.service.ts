import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RequestTeam} from '../model/interface/request-interface';

@Injectable({
    providedIn: 'root'
})
export class RequestService {

    constructor(private http: HttpClient) { }

    askToJoin(request: RequestTeam): Observable<any> {
        return this.http.post<any>('http://127.0.0.1:8088/api/request', request);
    }

    getRequestByIdUser(idUser: string): Observable<any> {
        return this.http.get<any>('http://127.0.0.1:8088/api/request/user/' + idUser);
    }

    getRequestByIdTeam(idTeam: string): Observable<any> {
        return this.http.get<any>('http://127.0.0.1:8088/api/request/team/' + idTeam);
    }

    deleteRequestById(id: string): Observable<any> {
        return this.http.delete<any>('http://127.0.0.1:8088/api/request/delete/' + id);
    }
}
