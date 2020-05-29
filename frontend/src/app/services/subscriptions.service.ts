import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {

  private userUrl = '/api/users/';

  constructor(private http: HttpClient) {}

  public getSubscriptions(userId: number): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl + userId + "/subscriptions");
  }

  public getSubscribers(userId: number): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl + userId + "/subscribers");
  }

  public saveSubscription(userId: number, user: User): Observable<User> {
    return this.http.post<User>(this.userUrl + userId + "/subscriptions", user);
  }

  public deleteSubscription(userId: number, subId: number): Observable<{}> {
    return this.http.delete(this.userUrl + userId + "/subscriptions/" + subId);
  }
}
