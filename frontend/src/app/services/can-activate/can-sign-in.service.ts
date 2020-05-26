import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {StorageService} from "../storage.service";

@Injectable({providedIn: "root"})
export class CanSignInService implements CanActivate {

  constructor(public auth: StorageService,
              private router: Router) {}

  public canActivate(): boolean {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(["news"]);
      return false;
    }
    return true;
  }

}
