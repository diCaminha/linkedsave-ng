import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LinkCreateComponent } from './links/link-create/link-create.component';
import { LinkListComponent } from './links/link-list/link-list.component';

const routes: Routes = [
  {path: '', component: LinkListComponent},
  {path: 'create', component: LinkCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
