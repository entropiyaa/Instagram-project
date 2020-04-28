import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewsComponent} from "./modules/pages/news/components/news.component";
import {ProfileComponent} from "./modules/pages/profile/components/profile.component";
import {LoginComponent} from "./modules/pages/login/components/login.component";


const routes: Routes = [
  { path: '', redirectTo: '/news', pathMatch: 'full' },
  { path: 'news', component: NewsComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
