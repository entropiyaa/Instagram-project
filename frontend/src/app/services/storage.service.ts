import {Injectable, OnDestroy} from "@angular/core";
import {User} from "../models/user";
import {LoginService} from "./login.service";
import {Observable, Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StorageService implements OnDestroy {

  private readonly TOKEN_KEY: string = "token";
  private subscriptions: Subscription[] = [];

  constructor(private loginService: LoginService) {}

  public isAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    return token && token !== "null" && !!this.getCurrentUser(); // todo it would be better to add parsing toke. Check expiration!
  }

  public setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  public getCurrentUser(): Observable<User> {
    return this.loginService.getAuthorizedUser();
  }

  public getToken(): string {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  public clearToken(): void {
    localStorage.setItem(this.TOKEN_KEY, null);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }
}
