import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component.';
import { HeatCalendarComponent } from './links/components/heat-calendar/heat-calendar.component';
import { LinkCreateComponent } from './links/link-create/link-create.component';
import { LinkListComponent } from './links/link-list/link-list.component';

const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: LinkListComponent },
  { path: 'create', canActivate: [AuthGuard], component: LinkCreateComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'dayreads',
    canActivate: [AuthGuard],
    component: HeatCalendarComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
