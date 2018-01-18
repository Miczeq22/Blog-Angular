import { Http, Headers, RequestOptions } from '@angular/http';

export abstract class AbstractService {
  protected headers: Headers;
  protected apiUrl: string;

  constructor(protected http: Http) {
    this.headers = new Headers();
    this.headers.append('Authorization', localStorage.getItem('token'));
    this.apiUrl = 'http://localhost:8080/api';
   }
}
