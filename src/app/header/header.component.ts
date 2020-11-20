import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'ls-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

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
