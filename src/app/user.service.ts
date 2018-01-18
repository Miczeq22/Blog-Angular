import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { User } from './model/user.model';

@Injectable()
export class UserService {

  private apiUrl = 'http://localhost:8080/api/user';
  private headers: Headers;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Authorization', localStorage.getItem('token'));
  }

  getOneById(id: number): Observable<any> {
    return this.http.get(this.apiUrl + '/' + id, new RequestOptions({ headers: this.headers }))
    .map((res: Response) => res.json());
  }

  save(user: User): Observable<any> {
    return this.http.post(this.apiUrl, user)
    .map((res: Response) => res.json());
  }
}
