import { NgModule } from "@angular/core";
import {CommonModule} from "@angular/common";
import {ReactionComponent} from "./components/reaction.component";


@NgModule({
  declarations: [
    ReactionComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [],
  exports: [ReactionComponent]
})
export class ReactionModule {}
