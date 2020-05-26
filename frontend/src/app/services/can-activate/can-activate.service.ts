import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {StorageService} from "../storage.service";

@Injectable({providedIn: "root"})
export class CanActivateService implements CanActivate {

  constructor(public auth: StorageService,
              public router: Router) {
  }

  public canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(["login"]);
      return false;
    }
    return true;
  }
}
