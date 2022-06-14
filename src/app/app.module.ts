import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { CreateAccountComponent } from './authentication/create-account/create-account.component';
import { LoginComponent } from './authentication/login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { DashboardComponent } from './main-page/dashboard/dashboard.component';
import { HomeComponent } from './main-page/home/home.component';
import { SingleViewComponent } from './main-page/home/single-view/single-view.component';
import { UserComponent } from './main-page/user/user.component';
import { EditProfileComponent } from './main-page/user/edit-profile/edit-profile.component';
import { HistoryComponent } from './main-page/user/history/history.component';
import { ImageComponent } from './main-page/image/image.component';
import { AuthInterceptorService } from './services/auth.interceptor.service';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';
import { GridViewComponent } from './main-page/home/grid-view/grid-view.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    CreateAccountComponent,
    LoginComponent,
    MainPageComponent,
    DashboardComponent,
    HomeComponent,
    SingleViewComponent,
    UserComponent,
    EditProfileComponent,
    HistoryComponent,
    ImageComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    GridViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
