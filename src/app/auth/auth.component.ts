import { formatNumber } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponse } from '../models/AuthResponse';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {


  isLoginMode: boolean = true;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  OnToggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authResponse: Observable<AuthResponse>;

    if (this.isLoginMode) {
      authResponse = this.authService.login(email, password);
    }
    else {
      authResponse = this.authService.signUp(email, password);
    }
    authResponse.subscribe(response => {

      this.router.navigate(['/movies']);

    }, err => {
      console.log(err);
    });
  }

}
