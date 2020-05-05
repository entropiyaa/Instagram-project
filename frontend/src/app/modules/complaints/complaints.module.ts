import { NgModule } from "@angular/core";
import {ComplaintsComponent} from "./components/complaints.component";
import {CommonModule} from "@angular/common";


@NgModule({
  declarations: [
    ComplaintsComponent
  ],
  imports: [
    CommonModule

  ],
  providers: [],
  exports: [ComplaintsComponent]
})
export class ComplaintsModule {}
