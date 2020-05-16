import { NgModule } from "@angular/core";
import {CommonModule} from "@angular/common";
import {ReactionComponent} from "./components/reaction.component";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    ReactionComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [],
  exports: [ReactionComponent]
})
export class ReactionModule {}
