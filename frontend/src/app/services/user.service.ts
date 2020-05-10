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

  public generateToken(login: Login): Observable<AuthToken> {
    return this.http.post<AuthToken>("/api/token/generate-token", login);
  }

  public getAuthorizedUser(): Observable<User> {
    return this.http.get<User>("/api/logins/current");
  }

  public getUser(userId: number): Observable<User> {
    return this.http.get<User>(this.userUrl + '/' + userId);
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
  }
}

export interface AuthToken {
  readonly token: string;
}
