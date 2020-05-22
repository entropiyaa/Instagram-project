import {Injectable, OnDestroy} from "@angular/core";
import {Subscription} from "rxjs";
import {AuthToken} from "../models/authToken";

@Injectable({
  providedIn: 'root'
})
export class StorageService implements OnDestroy {

  private readonly TOKEN_KEY: string = "token";
  private subscriptions: Subscription[] = [];

  constructor() {
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    return token && token !== "null";
  }

  public setToken(token: AuthToken): void {
    localStorage.setItem(this.TOKEN_KEY, token.token);
  }

  public getToken(): string {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  public clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }
}
