import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

export class ServiceClass {
    protected readonly BASE_URL = environment.apiUrl;
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(protected httpClient: HttpClient) {

    }

    protected post(url: string, body: any): Observable<any> {
        return this.httpClient.post<any>(url, body, this.httpOptions);
    }

    protected get(url: string): Observable<any> {
        return this.httpClient.get(url, this.httpOptions);
    }

    protected put(url: string, body: any): Observable<any> {
        return this.httpClient.put(url, body, this.httpOptions);
    }

    protected delete(url: string): Observable<any> {
        return this.httpClient.delete(url, this.httpOptions);
    }
}
