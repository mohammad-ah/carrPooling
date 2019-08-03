import { BrowserModule } from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { NavbarComponent } from './navbar/navbar.component';
import {FooterComponent } from './footer/footer.component';
import { AllTripsComponent } from './all-trips/all-trips.component';
import { TableModule } from 'primeng/table';
import {DialogModule, ToggleButtonModule} from 'primeng/primeng';
import {SliderModule} from 'primeng/slider';
import {DropdownModule, MultiSelectModule, CalendarModule} from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UiSwitchModule } from 'ngx-ui-switch';
import { MytripsComponent } from './mytrips/mytrips.component';
import {UserService} from './services/user.service';
import {NeedAuthGuard} from './services/need-auth-guard.service';
import {MyInterceptor} from './services/interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    ResetpasswordComponent,
    NavbarComponent,
    FooterComponent,
    AllTripsComponent,
    MytripsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TableModule,
    SliderModule,
    DropdownModule,
    MultiSelectModule,
    CalendarModule,
    DialogModule,
    BrowserAnimationsModule,
    ToggleButtonModule,
    UiSwitchModule,
  ],

  providers: [
      UserService,
      NeedAuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyInterceptor,
      multi: true
    }
  ],
  schemas: [NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent],

})
export class AppModule { }
