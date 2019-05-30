import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {RequestTeam} from '../model/interface/request-interface';
import {ServiceClass} from '../model/class/service-class';

@Injectable({
    providedIn: 'root'
})
export class RequestService extends ServiceClass {

    askToJoin(request: RequestTeam): Observable<any> {
        return this.post('http://127.0.0.1:8088/api/request', request);
    }

    getRequestByIdUser(idUser: string): Observable<any> {
        return this.get('http://127.0.0.1:8088/api/request/user/' + idUser);
    }

    getRequestByIdTeam(idTeam: string): Observable<any> {
        return this.get('http://127.0.0.1:8088/api/request/team/' + idTeam);
    }

    deleteRequestById(id: string): Observable<any> {
        return this.delete('http://127.0.0.1:8088/api/request/delete/' + id);
    }
}
