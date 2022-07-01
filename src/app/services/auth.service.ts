import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { AuthResponse } from '../models/AuthResponse';
import { User } from '../models/user';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  static userObj: User;
  api_key = "AIzaSyA1uc16i1ZOJfVptXtBgBrr3fuiUreW2e8";
  signUpUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
  signInUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {

  }


  signUp(email: string, password: string) {
    return this.http.post<AuthResponse>(this.signUpUrl + this.api_key, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      tap(response => {
        const expirationDate = new Date(new Date().getTime() + (Number(response.expiresIn) * 1000));

        const user = new User(response.email, response.localId, response.idToken, expirationDate);

        this.user.next(user);
      })
    );
  }


  login(email: string, password: string) {
    return this.http.post<AuthResponse>(this.signInUrl + this.api_key, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      tap(response => {
        const expirationDate = new Date(new Date().getTime() + (Number(response.expiresIn) * 1000));

        AuthService.userObj = new User(response.email, response.localId, response.idToken, expirationDate);

        this.user.next(AuthService.userObj);
      })
    );
  }
}
