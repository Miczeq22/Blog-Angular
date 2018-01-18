import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Article } from './model/article.model';

@Injectable()
export class ArticleService {
  private apiUrl = 'http://localhost:8080/api/article';
  private headers: Headers;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Authorization', localStorage.getItem('token'));
  }

  getAll(): Observable<any> {
    return this.http.get(this.apiUrl, new RequestOptions({ headers: this.headers }))
    .map((res: Response) => res.json())
    .catch((err: any) => Observable.throw(err.json() || 'Server error'));
  }

  getOne(id: number): Observable<any> {
    return this.http.get(this.apiUrl + '/' + id, new RequestOptions({ headers: this.headers }))
    .map((res: Response) => res.json())
    .catch((err: any) => Observable.throw(err.json() || 'Server error'));
  }

  save(article: Article): Observable<any> {
    return this.http.post(this.apiUrl, article, new RequestOptions({ headers: this.headers }))
    .map((res: Response) => res.json());
  }

  remove(id: number) {
    return this.http.delete(this.apiUrl + '/' + id, new RequestOptions({ headers: this.headers }))
    .map((res: Response) => res.json());
  }

}
