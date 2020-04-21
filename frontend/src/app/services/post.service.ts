import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../models/post";
import {Sort} from "../models/sort";
import {Order} from "../models/order";
// import {Page} from "../models/page";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postsUrl = '/api/posts';

  constructor(private http: HttpClient) {}

  public getPosts(pageNumber: number, pageSize: number, sort: Sort, order: Order): Observable<Post[]> {
    const params = new HttpParams()
      .set('page', pageNumber.toString())
      .set('size', pageSize.toString())
      .set('sort', sort.toString())
      .set('order', order.toString());
    return this.http.get<Post[]>(this.postsUrl, {params});
  }

  public getLatestPosts(pageNumber: number, pageSize: number, sort: Sort, order: Order): Observable<Post[]> {
    const params = new HttpParams()
      .set('page', pageNumber.toString())
      .set('size', pageSize.toString())
      .set('sort', sort.toString())
      .set('order', order.toString());
    return this.http.get<Post[]>(this.postsUrl+ '/last', {params});
  }
}
