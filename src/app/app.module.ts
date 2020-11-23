import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LinkCreateComponent } from './links/link-create/link-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { LinkListComponent } from './links/link-list/link-list.component';
import { SignupComponent } from './auth/signup/signup.component.';
import { AuthInterceptor } from './auth/auth-interceptor';
import { LoginComponent } from './auth/login/login.component';
import { CardLinkComponent } from './links/components/card-link/card-link.component';
import { EmptyScreenComponent } from './links/components/empty-screen/empty-screen.component';
import { HighlightOnHoverLinkDirective } from './directives/highlight-on-hover-link.directive';

@NgModule({
  declarations: [
    AppComponent,
    LinkCreateComponent,
    HeaderComponent,
    LinkListComponent,
    LoginComponent,
    SignupComponent,
    CardLinkComponent,
    EmptyScreenComponent,
    HighlightOnHoverLinkDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule,
    FlexLayoutModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatTooltipModule


  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
