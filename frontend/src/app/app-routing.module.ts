import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewsComponent} from "./modules/pages/news/components/news.component";
import {ProfileComponent} from "./modules/pages/profile/components/profile.component";
import {LoginComponent} from "./modules/pages/login/components/login.component";
import {PostComponent} from "./modules/post/components/post.component";


const routes: Routes = [
  { path: '', redirectTo: '/news', pathMatch: 'full' },
  { path: 'news', component: NewsComponent},
  { path: 'news/profile/:id', component: ProfileComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'profile/:id', component: ProfileComponent},
  { path: 'login', component: LoginComponent},
  { path: 'post/:id', component: PostComponent},
  { path: 'profile/post/:id', component: PostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
