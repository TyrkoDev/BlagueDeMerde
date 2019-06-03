import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ServiceClass} from '../model/class/service-class';
import {HttpClient} from '@angular/common/http';
import {Vote} from '../model/interface/vote-interface';
import {ResponseEntity} from '../model/entity/response-entity';


@Injectable({
    providedIn: 'root'
})
export class VoteService extends ServiceClass {

    constructor(protected httpClient: HttpClient) {
        super(httpClient);
    }

    vote(vote: Vote): Observable<ResponseEntity<any>> {
        return this.post(this.BASE_URL + '/vote', vote);
    }
}
