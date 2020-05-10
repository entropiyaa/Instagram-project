import {Injectable} from "@angular/core";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private readonly TOKEN_KEY: string = "token";
  private readonly CURRENT_USER: string = "currentUser";

  private currentUser: User;

  public isAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    return token && token !== "null" && !!this.getCurrentUser(); // todo it would be better to add parsing toke. Check expiration!
  }

  public setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  public setCurrentUser(currentUser: User): void {
    this.currentUser = currentUser;
    localStorage.setItem(this.CURRENT_USER, JSON.stringify(currentUser));
  }

  public getCurrentUser(): User {
    return this.currentUser || JSON.parse(localStorage.getItem(this.CURRENT_USER));
  }

  public getToken(): string {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  public clearToken(): void {
    localStorage.setItem(this.TOKEN_KEY, null);
  }
}
