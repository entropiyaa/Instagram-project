import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewsComponent} from "./modules/pages/news/components/news.component";
import {ProfileComponent} from "./modules/pages/profile/components/profile.component";
import {LoginComponent} from "./modules/pages/login/components/login.component";
import {PostComponent} from "./modules/post/components/post.component";
import {CanActivateService} from "./services/can-activate.service";


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'news', component: NewsComponent,  canActivate: [CanActivateService]},
  { path: 'profile', component: ProfileComponent,  canActivate: [CanActivateService]},
  { path: 'login', component: LoginComponent},
  { path: 'post/:id', component: PostComponent,  canActivate: [CanActivateService]},
  { path: 'profile/post/:id', component: PostComponent, canActivate: [CanActivateService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
