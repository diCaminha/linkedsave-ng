import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component.';
import { LinkCreateComponent } from './links/link-create/link-create.component';
import { LinkListComponent } from './links/link-list/link-list.component';

const routes: Routes = [
  {path: '', component: LinkListComponent},
  {path: 'create', component: LinkCreateComponent},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
