import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../models/post";
// import {Page} from "../models/page";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postsUrl = '/api/posts';

  constructor(private http: HttpClient) {}

  getPosts(pageNumber: number, pageSize: number): Observable<Post[]> {
    const params = new HttpParams()
      .set('page', pageNumber.toString())
      .set('size', pageSize.toString());
    return this.http.get<Post[]>(this.postsUrl, {params});
  }

  // getLatestPosts(): Observable<Post[]> {
  //   return this.http.get<Post[]>(this.postsUrl+ '/last');
  // }
}
