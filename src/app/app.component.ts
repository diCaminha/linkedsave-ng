import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { Link } from './models/link';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isAuth: boolean = false;
  isAuthSubs: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isAuth = this.authService.isAuth;
    this.isAuthSubs = this.authService.getAuthStatusListener().subscribe(res => this.isAuth = res);
  }
  ngOnDestroy(): void {
    this.isAuthSubs.unsubscribe();
  }
}
