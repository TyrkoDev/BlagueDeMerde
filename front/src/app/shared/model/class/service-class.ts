import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

export class ServiceClass {
    protected readonly BASE_URL = 'http://127.0.0.1/api';

    constructor(protected httpClient: HttpClient) {

    }

    private constructHeaders(): any {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
            })
        };

        if(localStorage.getItem('authenticate')) {
            httpOptions.headers.append('Authorization', localStorage.getItem('authenticate'));
        }

        return httpOptions;
    }

    protected post(url: string, body: any): Observable<any> {
        return this.httpClient.post(url, body, this.constructHeaders());
    }

    protected get(url: string): Observable<any> {
        return this.httpClient.get(url, this.constructHeaders());
    }

    protected put(url: string, body: any): Observable<any> {
        return this.httpClient.put(url, body, this.constructHeaders());
    }

    protected delete(url: string): Observable<any> {
        return this.httpClient.delete(url, this.constructHeaders());
    }
}
