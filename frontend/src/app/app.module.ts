import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from "./modules/header/header.module";
import { FooterModule } from "./modules/footer/footer.module";
import {PostsModule} from "./modules/posts/posts.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NewsModule} from "./modules/pages/news/news.module";
import {ProfileModule} from "./modules/pages/profile/profile.module";
import {LoginModule} from "./modules/pages/login/login.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {PostModule} from "./modules/post/post.module";
import {UserService} from "./services/user.service";
import {APIInterceptor} from "./interceptors/api-interceptor";

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
    PostsModule,
    HttpClientModule,
    ProfileModule,
    LoginModule,
    BrowserAnimationsModule,
    PostModule
  ],
  providers: [UserService, APIInterceptor, {
    provide: HTTP_INTERCEPTORS,
    useClass: APIInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
