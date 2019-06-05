import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {RequestTeam} from '../model/interface/request-interface';
import {ServiceClass} from '../model/class/service-class';
import {HttpClient} from '@angular/common/http';
import {ResponseEntity} from '../model/entity/response-entity';
import {RequestEntity} from "../model/entity/request-entity";

@Injectable({
    providedIn: 'root'
})
export class RequestService extends ServiceClass {

    constructor(protected httpClient: HttpClient) {
        super(httpClient);
    }

    askToJoin(request: RequestTeam): Observable<ResponseEntity<any>> {
        return this.post(this.BASE_URL + '/request', request);
    }

    getRequestByIdUser(idUser: string): Observable<ResponseEntity<RequestEntity[]>> {
        return this.get(this.BASE_URL + '/request/user/' + idUser);
    }

    getRequestByIdTeam(idTeam: string): Observable<ResponseEntity<RequestEntity[]>> {
        return this.get(this.BASE_URL + '/request/team/' + idTeam);
    }

    deleteRequestById(id: string): Observable<ResponseEntity<any>> {
        return this.delete(this.BASE_URL + '/api/request/delete/' + id);
    }
}
