import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Comment} from "../models/comment";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private commentUrl = '/api/comments';

  constructor(private http: HttpClient) {}

  public getComment(commentId: number): Observable<Comment> {
    return this.http.get<Comment>(this.commentUrl + "/" + commentId);
  }

  public getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.commentUrl);
  }

  public getCommentsByPostId(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.commentUrl + "?post=" + postId);
  }

  public saveComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.commentUrl, comment);
  }

  public deleteComment(commentId: number): Observable<{}>{
    return this.http.delete( this.commentUrl+ '/' + commentId);
  }

}
