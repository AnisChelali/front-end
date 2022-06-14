import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { User } from '../Shared/userModel';

export interface AuthResponseData {
  status: string;
  token: {
    id: string;
    expiresIn: number;
  };
  data: {
    user: {
      id: string;
      username: string;
      email: string;
    };
  };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private expirationDate: any;

  constructor(private http: HttpClient, private router: Router) {}

  signup(userData: {
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
    invitationCode: string;
  }) {
    return this.http
      .post<AuthResponseData>('http://localhost:3000/authenticate/signup', {
        ...userData,
      })
      .pipe(
        tap((responseData: AuthResponseData) => {
          this.handlingExpirationDate(
            responseData.data.user.username,
            responseData.data.user.email,
            responseData.data.user.id,
            responseData.token.id,
            +responseData.token.expiresIn
          );
        })
      );
  }

  login(userData: { username: string; password: string }) {
    return this.http
      .post<AuthResponseData>('http://localhost:3000/authenticate/login', {
        ...userData,
      })
      .pipe(
        tap((responseData: AuthResponseData) => {
          this.handlingExpirationDate(
            responseData.data.user.username,
            responseData.data.user.email,
            responseData.data.user.id,
            responseData.token.id,
            +responseData.token.expiresIn
          );
        })
      );
  }

  logout() {
    this.user = null;
    this.router.navigate(['/authenticate']);
    localStorage.removeItem('userData');
    if (this.expirationDate) clearTimeout(this.expirationDate);
    this.expirationDate = null;
  }

  updateProfile(userData: {
    username: string;
    email: string;
    currentPassword: string;
    newPassword: string;
  }) {
    return this.http.post<{
      status: string;
      user: { id: string; username: string; email: string };
    }>('http://localhost:3000/user/edit-profile', userData);
  }

  forgotPassword(userData: { email: string }) {
    return this.http.post<{ status: string; message: string }>(
      'http://localhost:3000/authenticate/forgot-password',
      userData
    );
  }

  resetPassword(userData: { code: string; newPassword: string }) {
    return this.http.patch<{ status: string; message: string }>(
      'http://localhost:3000/authenticate/reset-password',
      userData
    );
  }

  autoLogin() {
    const userData: {
      username: string;
      email: string;
      _id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) return;
    const loadedUser = new User(
      userData.username,
      userData.email,
      userData._id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(loadedUser._tokenExpirationDate).getTime() -
        new Date().getTime();

      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expiresIn: number) {
    this.expirationDate = setTimeout(() => {
      this.logout();
    }, expiresIn);
  }

  private handlingExpirationDate(
    username: string,
    email: string,
    id: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(
      new Date().getTime() + expiresIn * 60 * 60 * 1000
    );
    const user: User = new User(username, email, id, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 60 * 60 * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
