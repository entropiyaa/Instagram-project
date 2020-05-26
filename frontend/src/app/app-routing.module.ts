import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewsComponent} from "./modules/pages/news/components/news.component";
import {ProfileComponent} from "./modules/pages/profile/components/profile.component";
import {LoginComponent} from "./modules/pages/login/components/login.component";
import {PostComponent} from "./modules/post/components/post.component";
import {CanActivateService} from "./services/can-activate/can-activate.service";
import {RegistrationComponent} from "./modules/pages/registration/components/registration.component";
import {CanSignInService} from "./services/can-activate/can-sign-in.service";
import {ComplaintsComponent} from "./modules/complaints/components/complaints.component";
import {UsersComponent} from "./modules/pages/users/component/users.component";
import {ReactionViewComponent} from "./modules/reaction-view/components/reaction-view.component";
import {NotFoundComponent} from "./modules/not-found/component/not-found.component";


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'news', component: NewsComponent,  canActivate: [CanActivateService]},
  { path: 'profile', component: ProfileComponent,  canActivate: [CanActivateService]},
  { path: 'login', component: LoginComponent, canActivate: [CanSignInService]},
  { path: 'register', component: RegistrationComponent,  canActivate: [CanSignInService]},
  { path: 'users', component: UsersComponent,  canActivate: [CanActivateService]},
  { path: 'post/:id', component: PostComponent,  canActivate: [CanActivateService]},
  { path: 'profile/post/:id', component: PostComponent, canActivate: [CanActivateService]},
  { path: 'complaints/:id', component: ComplaintsComponent, canActivate: [CanActivateService]},
  { path: 'reactions/:id', component: ReactionViewComponent, canActivate: [CanActivateService]},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
