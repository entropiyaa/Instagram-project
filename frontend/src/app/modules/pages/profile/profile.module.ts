import { NgModule } from "@angular/core";
import {ProfileComponent} from "./components/profile.component";
import {ImageLoadModule} from "../../image/image-load.module";
import {CommonModule} from "@angular/common";


@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    ImageLoadModule,
    CommonModule
  ],
  providers: [],
  exports: [ProfileComponent]
})
export class ProfileModule {}
