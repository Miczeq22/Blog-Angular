import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LoginService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: Http) { }

  getToken(username: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl + '/getToken', JSON.stringify({ username: username, password: password }))
    .map((res: Response) => res.json())
   .catch((err: any) => Observable.throw(err.json() || 'Server error'));
  }

}
