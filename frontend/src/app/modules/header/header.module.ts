import { NgModule } from "@angular/core";
import { HeaderComponent } from "./components/header.component";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";


@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    RouterModule,
    CommonModule
  ],
  providers: [],
  exports: [HeaderComponent]
})
export class HeaderModule {}
