import {ServiceClass} from '../model/class/service-class';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Member} from '../model/interface/member-interface';
import {HttpClient} from '@angular/common/http';
import {ResponseEntity} from '../model/entity/response-entity';

@Injectable({
    providedIn: 'root'
})
export class MemberService extends ServiceClass {

    constructor(protected httpClient: HttpClient) {
        super(httpClient);
    }

    getTeamMembers(idTeam: string): Observable<ResponseEntity<Member[]>> {
        return this.get(this.BASE_URL + '/member/team/' + idTeam);
    }
}
