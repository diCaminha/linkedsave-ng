import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LinkCreateComponent } from 'src/app/links/link-create/link-create.component';
import { User } from 'src/app/models/user';
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
        private authService: AuthService,
        private router: Router) { }

    onLogin() {
        const email = this.loginForm.value['email'];
        const password = this.loginForm.value['password'];
        this.authService.login(email, password).subscribe(res => {
            this.authService.token = res.token;
            this.router.navigate(['/']);
        });
    }
}
