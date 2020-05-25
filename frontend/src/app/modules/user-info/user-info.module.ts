import { NgModule } from "@angular/core";
import {UserInfoComponent} from "./components/user-info.component";
import {MatCardModule} from "@angular/material/card";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    UserInfoComponent
  ],
  imports: [
    MatCardModule,
    CommonModule,
    RouterModule
  ],
  providers: [],
  exports: [UserInfoComponent]
})
export class UserInfoModule {}
