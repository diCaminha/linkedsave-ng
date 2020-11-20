import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
    providedIn: "root"
})
export class AuthService {

    constructor(private http: HttpClient) { }

    signup(user: User): Observable<{ message: string, data: User }> {
        return this.http.post<{ message: string, data: User }>(environment.API_URL + 'auth/signup', user);
    }

    login(email:string, password: string) {
        return this.http.post(environment.API_URL + 'auth/login', {email, password});
    }
}