import { NgModule } from "@angular/core";
import {PostComponent} from "./components/post.component";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {PostService} from "../../services/post.service";


@NgModule({
  declarations: [
    PostComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
  ],
  providers: [PostService],
  exports: [PostComponent]
})
export class PostModule {}
