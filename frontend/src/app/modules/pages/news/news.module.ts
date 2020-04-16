import { NgModule } from "@angular/core";
import {NewsComponent} from "./components/news.component";
import {PanelAdminComponent} from "./components/panel/panel-admin.component";
import {FormsModule} from "@angular/forms";
import {PostModule} from "../../post/post.module";


@NgModule({
  declarations: [
    NewsComponent,
    PanelAdminComponent
  ],
  imports: [
    FormsModule,
    PostModule
  ],
  providers: [],
  exports: [NewsComponent]
})
export class NewsModule {}
