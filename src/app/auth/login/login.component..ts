import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';

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

    constructor(private formBuilder: FormBuilder) { }
    
    onLogin() {
        console.log(this.loginForm.value['email']);
    }
}
