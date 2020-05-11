import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Login} from "../models/login";
import {User} from "../models/user";
import {AuthToken} from "../models/authToken";
import {LoginUser} from "../models/loginUser";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginsUrl = '/api/logins';

  constructor(private http: HttpClient) {}

  public generateToken(loginUser: LoginUser): Observable<AuthToken> {
    return this.http.post<AuthToken>("/api/token/generate-token", loginUser);
  }

  public getAuthorizedUser(): Observable<User> {
    return this.http.get<User>(this.loginsUrl + "/current");
  }

  public register(login: Login): Observable<Login> {
    return this.http.post<Login>(this.loginsUrl + '/signup', login);
  }
}
