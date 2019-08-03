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
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HelpComponent } from './help/help.component';
import {EmbedVideo} from "ngx-embed-video/dist";
import {NgbRatingModule} from "@ng-bootstrap/ng-bootstrap";
import { DratingComponent } from './drating/drating.component';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';

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
    HomeComponent,
    AboutComponent,
    ContactComponent,
    HelpComponent,
    DratingComponent,
    ManageProfileComponent,
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
    EmbedVideo,
    NgbRatingModule
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
