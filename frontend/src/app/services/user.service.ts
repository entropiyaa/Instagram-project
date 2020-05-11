import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user";
import {Login} from "../models/login";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = '/api/users';

  constructor(private http: HttpClient) {}

  public getUser(userId: number): Observable<User> {
    return this.http.get<User>(this.userUrl + '/' + userId);
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
  }
}
