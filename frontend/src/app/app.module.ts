import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from "./modules/header/header.module";
import { FooterModule } from "./modules/footer/footer.module";
import {PostModule} from "./modules/post/post.module";
import {HttpClientModule} from "@angular/common/http";
import {NewsModule} from "./modules/pages/news/news.module";
import {ProfileModule} from "./modules/pages/profile/profile.module";
import {LoginModule} from "./modules/pages/login/login.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HeaderModule,
    FooterModule,
    NewsModule,
    PostModule,
    HttpClientModule,
    ProfileModule,
    LoginModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
