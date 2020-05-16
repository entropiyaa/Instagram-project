import { NgModule } from "@angular/core";
import { HeaderComponent } from "./components/header.component";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    RouterModule
  ],
  providers: [],
  exports: [HeaderComponent]
})
export class HeaderModule {}
