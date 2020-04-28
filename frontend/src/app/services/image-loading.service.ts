import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../models/post";
import {Image} from "../models/image";

@Injectable({
  providedIn: 'root'
})
export class ImageLoadingService {

  private imageUrl = '/api/images';

  constructor(private http: HttpClient) {}

  // public getImage(): Observable<Image[]> {
  //   return this.http.get<Comment[]>(this.commentUrl + '/all');
  // }

  public saveImage(data: FormData): Observable<any> {
    console.log("a");
    return this.http.post<any>(this.imageUrl, data);
  }

}
