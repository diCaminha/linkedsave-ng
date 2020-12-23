import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LSMaterialModule } from './material.module';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { LinkCreateComponent } from './pages/links/link-create/link-create.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { LinkListComponent } from './pages/links/link-list/link-list.component';
import { CardLinkComponent } from './shared/components/card-link/card-link.component';
import { EmptyScreenComponent } from './pages/empty-screen/empty-screen.component';
import { HighlightOnHoverLinkDirective } from './shared/directives/highlight-on-hover-link.directive';
import { InputFocusDirective } from './shared/directives/input-focus.directive';
import { DayReadsModule } from './pages/dayreads/day-reads.module';
import { AuthModule } from './pages/auth/auth.module';
import { AuthInterceptor } from './core/interceptors/auth-interceptor';



@NgModule({
  declarations: [
    AppComponent,
    LinkCreateComponent,
    HeaderComponent,
    LinkListComponent,
    CardLinkComponent,
    EmptyScreenComponent,
    HighlightOnHoverLinkDirective,
    InputFocusDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    DayReadsModule,
    AuthModule,
    LSMaterialModule,
    MatSnackBarModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
