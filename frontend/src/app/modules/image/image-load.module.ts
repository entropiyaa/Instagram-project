import { NgModule } from "@angular/core";
import {ImageLoadComponent} from "./components/image-load.component";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    ImageLoadComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [],
  exports: [ImageLoadComponent]
})
export class ImageLoadModule {}
