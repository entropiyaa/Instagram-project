import { NgModule } from "@angular/core";
import {PostComponent} from "./components/post.component";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    PostComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [],
  exports: [PostComponent]
})
export class PostModule {}
