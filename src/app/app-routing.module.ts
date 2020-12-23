import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { DayReadsComponent } from './pages/dayreads/day-reads.component';
import { LinkCreateComponent } from './pages/links/link-create/link-create.component';
import { LinkListComponent } from './pages/links/link-list/link-list.component';

const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: LinkListComponent },
  { path: 'create', canActivate: [AuthGuard], component: LinkCreateComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'dayreads',
    canActivate: [AuthGuard],
    component: DayReadsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
