import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private commentUrl = '/api/comments';

  constructor(private http: HttpClient) {}

  public getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.commentUrl + '/all');
  }

}
