import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationComponent } from './authentication/authentication.component';
import { CreateAccountComponent } from './authentication/create-account/create-account.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { LoginComponent } from './authentication/login/login.component';
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';
import { ImageComponent } from './main-page/image/image.component';
import { DashboardComponent } from './main-page/dashboard/dashboard.component';
import { HomeComponent } from './main-page/home/home.component';
import { MainPageComponent } from './main-page/main-page.component';
import { EditProfileComponent } from './main-page/user/edit-profile/edit-profile.component';
import { HistoryComponent } from './main-page/user/history/history.component';
import { UserComponent } from './main-page/user/user.component';
import { AuthGuardService } from './services/auth.guard';
import { GridViewComponent } from './main-page/home/grid-view/grid-view.component';
import { SingleViewComponent } from './main-page/home/single-view/single-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  {
    path: '',
    canActivate: [AuthGuardService],
    component: MainPageComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'home',
        children: [
          { path: '', component: GridViewComponent },
          { path: 'single-view', component: SingleViewComponent },
        ],
      },
      { path: 'image/:url', component: ImageComponent },
      {
        path: 'user',
        children: [
          { path: '', component: UserComponent },
          { path: 'edit-profile', component: EditProfileComponent },
          { path: 'history', component: HistoryComponent },
        ],
      },
    ],
  },
  {
    path: 'authenticate',
    children: [
      { path: '', component: AuthenticationComponent },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: CreateAccountComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
