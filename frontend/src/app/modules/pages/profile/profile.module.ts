import { NgModule } from "@angular/core";
import {ProfileComponent} from "./components/profile.component";
import {CommonModule} from "@angular/common";
import {PostsModule} from "../../posts/posts.module";
import {RouterModule} from "@angular/router";
import {PostModule} from "../../post/post.module";
import {PagingModule} from "../../paging/paging.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    PostsModule,
    RouterModule,
    PostModule,
    PagingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [],
  exports: [ProfileComponent]
})
export class ProfileModule {}
