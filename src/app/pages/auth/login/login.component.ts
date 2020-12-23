import { Route } from '@angular/compiler/src/core';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { AuthService } from '../../../core/services/auth.service';

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
    private snackbarService: SnackbarService
  ) {}

  onLogin() {
    this.isLoading = true;
    const email = this.loginForm.value['email'];
    const password = this.loginForm.value['password'];

    this.authService.login(email, password).subscribe(
      (response) => {
        this.authService.savingToken(response);
        this.snackbarService.openSnackBarSuccess('Welcome to LinkSaved!', null);
        this.router.navigate(['/']);
      },
      (err) => {
        console.log(err);
        this.snackbarService.openSnackBarError('Invalid email and/or password.', null);
        this.isLoading = false;
      }
    );
  }
}
