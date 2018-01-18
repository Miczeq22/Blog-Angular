import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Comment } from './model/comment.model';

@Injectable()
export class CommentService {

  private apiUrl = 'http://localhost:8080/api/comment';
  private headers: Headers;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Authorization', localStorage.getItem('token'));
  }

  getAllForArticle(id: number): Observable<any> {
    return this.http.get(this.apiUrl + '/article/' + id, new RequestOptions({ headers: this.headers }))
    .map((res: Response) => res.json())
    .catch((err: any) => Observable.throw(err.json() || 'Server error'));
  }

  save(comment: Comment): Observable<any> {
    return this.http.post(this.apiUrl, comment, new RequestOptions({ headers: this.headers }))
    .map((res: Response) => res.json());
  }

  remove(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/' + id, new RequestOptions({ headers: this.headers }))
    .map((res: Response) => res.json());
  }

}
