import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';

@Component({
    selector: 'ls-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent {
    isLoading = false;
    signupForm: FormGroup = this.formBuilder.group({
        name: [''],
        email: [''],
        password: ['']
    });

    constructor(private formBuilder: FormBuilder) { }

    onSignup() {
        const newUser = {
            name: this.signupForm.value['email'],
            email: this.signupForm.value['email'],
            password: this.signupForm.value['password'],
        }


    }
}
