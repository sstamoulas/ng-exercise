import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LandingComponent } from './landing/landing.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';

const routes: Routes = [{
  path: 'landing',
  component: LandingComponent
}, {
  path: 'home',
  component: HomeComponent
}, {
  path: 'users',
  loadChildren: 'app/users/users.module#UsersModule'
}, {
  path: 'userdetail/:id',     
  component: UserDetailComponent 
}, {
  path: '**',
  redirectTo: 'landing'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
