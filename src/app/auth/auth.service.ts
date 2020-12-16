import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isAuth = false;
  private _token: string;
  private authStatusListener = new BehaviorSubject<boolean>(false);
  tokenTimer: NodeJS.Timer;

  constructor(private http: HttpClient, private router: Router) {
    if (localStorage.getItem('token')) {
      this._isAuth = true;
      this._token = localStorage.getItem('token');
      this.authStatusListener.next(true);
    }
  }

  get token() {
    return this._token;
  }

  set token(token: string) {
    this._token = token;
    this._isAuth = true;
    this.authStatusListener.next(true);
  }

  get isAuth() {
    return this._isAuth;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  signup(user: User): Observable<{ message: string; data: User }> {
    return this.http.post<{ message: string; data: User }>(
      environment.API_URL + 'auth/signup',
      user
    );
  }

  login(email: string, password: string) {
    return this.http.post<{ token: string; expiresIn: number }>(
      environment.API_URL + 'auth/login',
      { email, password }
    );
  }

  savingToken(response) {
    const token = response.token;
    this._token = token;
    if (token) {
      const expiresInDuration = response.expiresIn;
      this.tokenTimer = setTimeout(() => {
        this.logout();
      }, expiresInDuration);

      this._isAuth = true;
      this.authStatusListener.next(true);

      const now = new Date();
      const expirationDate = new Date(
        now.getTime() + expiresInDuration * 1000000
      );
      console.log(
        new Date(now.getTime() + expiresInDuration * 1000000).toString()
      );
      this.saveAuthData(token, expirationDate);
    }
  }

  logout() {
    this._isAuth = false;
    this.authStatusListener.next(false);
    this.clearAuthData();
    clearTimeout(this.tokenTimer);
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }
}
