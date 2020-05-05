import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../models/post";
import {Page} from "../models/page";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postsUrl = '/api/posts';

  constructor(private http: HttpClient) {}

  public getPosts(page: Page<Post>): Observable<Page<Post>> {
    const params = PostService.getParams(page);
    return this.http.get<Page<Post>>(this.postsUrl, {params});
  }

  public getLatestPosts(page: Page<Post>): Observable<Page<Post>> {
    const params = PostService.getParams(page);
    return this.http.get<Page<Post>>(this.postsUrl+ '/latest', {params});
  }

  public getPostsByUserId(userId: number, page: Page<Post>): Observable<Page<Post>> {
    const params = PostService.getParams(page);
    return this.http.get<Page<Post>>(this.postsUrl + "?user=" + userId, {params});
  }

  public getPost(postId: number): Observable<Post> {
    return this.http.get<Post>(this.postsUrl + '?id=' + postId);
  }

  public savePost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.postsUrl, post);
  }

  public deletePost(postId: number): Observable<{}> {
    return this.http.delete(this.postsUrl + '?id=' + postId);
  }

  private static getParams(page: Page<Post>): HttpParams {
    return new HttpParams()
      .set('page', page.pageNumber.toString())
      .set('size', page.pageSize.toString())
      .set('sort', page.sort.toString())
      .set('order', page.order.toString());
  }
}
