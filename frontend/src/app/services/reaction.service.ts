import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Reaction} from "../models/reaction";
import {ReactionType} from "../models/reaction-type";

@Injectable({
  providedIn: 'root'
})
export class ReactionService {

  private reactionUrl = '/api/reactions';

  constructor(private http: HttpClient) {}

  public getReaction(reactionId: number): Observable<Reaction> {
    return this.http.get<Reaction>(this.reactionUrl + "?id=" + reactionId);
  }

  public getReactionByUserIdAndPostId(userId: number, postId: number): Observable<Reaction> {
    return this.http.get<Reaction>(this.reactionUrl + "?user=" + userId + "&post=" + postId);
  }

  public getReactionsByPostIdAndType(postId: number, type: ReactionType): Observable<Reaction[]> {
    return this.http.get<Reaction[]>(this.reactionUrl + "?post=" + postId + "&reaction=" + type);
  }

  public saveReaction(reaction: Reaction): Observable<Reaction> {
    return this.http.post<Reaction>(this.reactionUrl, reaction);
  }

  public deleteReaction(reactionId: number): Observable<{}>{
    return this.http.delete( this.reactionUrl+ '?id=' + reactionId);
  }

}
