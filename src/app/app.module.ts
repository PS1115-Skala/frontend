import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Request } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { SignUpComponent } from 'app/sign-up/sign-up.component';
import { SignUpFinalComponent } from 'app/sign-up-final/sign-up-final.component';
import { RecoverPasswordComponent } from 'app/recover-password/recover-password.component';
import { ChangePasswordComponent } from 'app/change-password/change-password.component';



@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    LoadingBarModule,
    LoadingBarHttpClientModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    SignUpComponent,
    SignUpFinalComponent,
    RecoverPasswordComponent,
    ChangePasswordComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
