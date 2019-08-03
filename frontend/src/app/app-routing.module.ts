import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';

import { AllTripsComponent } from './all-trips/all-trips.component';
import {MytripsComponent} from './mytrips/mytrips.component';
import {NeedAuthGuard} from './services/need-auth-guard.service';

const routes: Routes = [
  {path: '', component:  LoginComponent},
  {path: 'registration', component:  RegistrationComponent},
  {path: 'reset', component:  ResetpasswordComponent},
  {path: 'alltrips', component:  AllTripsComponent, canActivate: [NeedAuthGuard]},
  {path: 'mytrips', component:  MytripsComponent,  canActivate: [NeedAuthGuard]},
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  providers: [

  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
