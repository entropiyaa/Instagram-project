import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewsComponent} from "./modules/pages/news/components/news.component";
import {ProfileComponent} from "./modules/pages/profile/components/profile.component";
import {LoginComponent} from "./modules/pages/login/components/login.component";
import {PostComponent} from "./modules/post/components/post.component";
import {CanActivateService} from "./services/can-activate.service";
import {RegistrationComponent} from "./modules/pages/registration/components/registration.component";
import {CanSignInService} from "./services/can-sign-in.service";
import {ComplaintsComponent} from "./modules/complaints/components/complaints.component";
import {UsersComponent} from "./modules/pages/users/component/users.component";


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'news', component: NewsComponent,  canActivate: [CanActivateService]},
  { path: 'profile', component: ProfileComponent,  canActivate: [CanActivateService]},
  { path: 'login', component: LoginComponent, canActivate: [CanSignInService]},
  { path: 'register', component: RegistrationComponent,  canActivate: [CanSignInService]},
  { path: 'users', component: UsersComponent,  canActivate: [CanActivateService]},
  { path: 'post/:id', component: PostComponent,  canActivate: [CanActivateService]},
  { path: 'profile/post/:id', component: PostComponent, canActivate: [CanActivateService]},
  { path: 'complaints/:id', component: ComplaintsComponent, canActivate: [CanActivateService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
