import { NgModule } from "@angular/core";
import {TitleComponent} from "./components/title/title.component";
import {MatCardModule} from "@angular/material/card";


@NgModule({
  declarations: [
   TitleComponent
  ],
  imports: [
    MatCardModule

  ],
  providers: [],
  exports: [TitleComponent]
})
export class ViewModule {}
