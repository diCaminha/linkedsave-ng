import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from '../auth.service';

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

    constructor(private formBuilder: FormBuilder, 
                private authService: AuthService,
                private router: Router ) { }

    onSignup() {
        const newUser: User = {
            id: null,
            name: this.signupForm.value['email'],
            email: this.signupForm.value['email'],
            password: this.signupForm.value['password'],
        }
        
        this.authService.signup(newUser).subscribe(result => {
            console.log(result.data);
            this.router.navigate(["/login"]);
        });

    }
}
