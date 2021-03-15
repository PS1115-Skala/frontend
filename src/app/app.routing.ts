import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';;
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from 'app/sign-up/sign-up.component';
import { SignUpFinalComponent } from 'app/sign-up-final/sign-up-final.component';
import { RecoverPasswordComponent } from 'app/recover-password/recover-password.component';
import { ChangePasswordComponent } from 'app/change-password/change-password.component';


const routes: Routes =[
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'sign-up-final',
    component: SignUpFinalComponent
  },
  {
    path: 'recover-password',
    component: RecoverPasswordComponent
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    }]
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
