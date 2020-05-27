import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {Role} from "../../models/enums/role";

@Injectable({providedIn: "root"})
export class CanActivateRoleService implements CanActivate {

  constructor(public authService: AuthService,
              private router: Router) {}

  public canActivate(): boolean {
    if (this.authService.getCurrentUser()) {
      if(this.authService.getCurrentUser().role === Role.ADMIN) {
        return true;
      }
    }
    this.router.navigate(["news"]);
    return false;
  }

}
