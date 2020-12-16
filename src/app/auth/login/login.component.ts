import { Route } from '@angular/compiler/src/core';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'ls-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isLoading = false;
  loginForm: FormGroup = this.formBuilder.group({
    email: [''],
    password: [''],
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar

  ) {}

  onLogin() {
    this.isLoading = true;
    const email = this.loginForm.value['email'];
    const password = this.loginForm.value['password'];

    this.authService.login(email, password).subscribe(response => {
        this.authService.savingToken(response);
        this.openSnackBar();
        this.router.navigate(['/']);
    }, err => {
        console.log(err);
        this.isLoading = false;
    })
  }

  openSnackBar() {
    let config = new MatSnackBarConfig();
    config.duration = 3000;

    this._snackBar.open("Welcome to LinkSaved!", null, config);
  }
}
