import { NgModule } from "@angular/core";
import {ProfileComponent} from "./components/profile.component";
import {CommonModule} from "@angular/common";


@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [],
  exports: [ProfileComponent]
})
export class ProfileModule {}
