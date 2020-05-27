import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = '/api/users';

  constructor(private http: HttpClient) {}

  public getUser(userId: number): Observable<User> {
    return this.http.get<User>(this.userUrl + '/' + userId);
  }

  public getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(this.userUrl + '/user/' + username);
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
  }

  public updateUser(userId: number, user: User): Observable<User> {
    return this.http.put<User>(this.userUrl + '/' + userId, user);
  }
}
