import { NgModule } from "@angular/core";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {NotFoundComponent} from "./component/not-found.component";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  providers: [],
  exports: [NotFoundComponent]
})
export class  NotFoundModule{}
