import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    selector: 'ls-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    isLoading = false;
    loginForm: FormGroup = this.formBuilder.group({
        email: [''],
        password: ['']
    });

    constructor(private formBuilder: FormBuilder,
        private authService: AuthService) { }

    onLogin() {
        this.isLoading = true;
        const email = this.loginForm.value['email'];
        const password = this.loginForm.value['password'];
        this.authService.login(email, password);
    }
}
