import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LinkCreateComponent } from './links/link-create/link-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { LinkListComponent } from './links/link-list/link-list.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { CardLinkComponent } from './links/components/card-link/card-link.component';
import { EmptyScreenComponent } from './links/components/empty-screen/empty-screen.component';
import { HighlightOnHoverLinkDirective } from './directives/highlight-on-hover-link.directive';
import { InputFocusDirective } from './directives/input-focus.directive';
import { DayReadsModule } from './dayreads/day-reads.module';
import { AuthModule } from './auth/auth.module';
import { LSMaterialModule } from './material.module';
import {MatSnackBarModule} from '@angular/material/snack-bar';



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
