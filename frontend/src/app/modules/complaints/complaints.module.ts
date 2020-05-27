import { NgModule } from "@angular/core";
import {ComplaintsComponent} from "./components/complaints.component";
import {CommonModule} from "@angular/common";
import {ViewModule} from "../view/view.module";
import {MatTableModule} from "@angular/material/table";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    ComplaintsComponent
  ],
  imports: [
    CommonModule,
    ViewModule,
    MatTableModule,
    RouterModule

  ],
  providers: [],
  exports: [ComplaintsComponent]
})
export class ComplaintsModule {}
