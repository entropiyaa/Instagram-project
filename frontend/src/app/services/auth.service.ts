import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {StorageService} from "./storage.service";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginsUrl = '/api/logins';
  private currentUser: User;

  constructor(private http: HttpClient,
              private storageService: StorageService) { }

  public getCurrentUser(): User {
    return this.currentUser;
  }

  public logout(): void {
    if(!this.storageService.isAuthenticated()) {
      this.currentUser = null;
    }
  }

  public getCurrentUserFromServer(): Promise<any> {
    if(this.storageService.isAuthenticated()) {
      const userPromise = this.http.get<User>(this.loginsUrl + "/current").toPromise();
        userPromise.then(user =>
          this.currentUser = user)
          .catch((err: any) => Promise.resolve());
        return userPromise;
    } else {
      return null;
    }
  }
}
