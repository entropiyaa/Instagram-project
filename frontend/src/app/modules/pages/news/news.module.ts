import { NgModule } from "@angular/core";
import {NewsComponent} from "./components/news.component";
import {PanelAdminComponent} from "./components/panel/panel-admin.component";
import {FormsModule} from "@angular/forms";
import {PostsModule} from "../../posts/posts.module";


@NgModule({
  declarations: [
    NewsComponent,
    PanelAdminComponent
  ],
  imports: [
    FormsModule,
    PostsModule
  ],
  providers: [],
  exports: [NewsComponent, PanelAdminComponent]
})
export class NewsModule {}
