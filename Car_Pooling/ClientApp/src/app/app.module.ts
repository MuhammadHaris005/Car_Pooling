import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
//import { NgxStarRatingModule } from 'ngx-star-rating';
// import { FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AmexioLayoutModule, AmexioWidgetModule,AmexioNotificationComponent} from 'amexio-ng-extensions';
import {AmexioEnterpriseModule} from 'amexio-ng-extensions';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from './_modal';

import { AppComponent } from './app.component';
import { SignupComponent} from './signup/signup.component';
import { VehicleinfoComponent } from './signup/vehicleinfo/vehicleinfo.component';
import { GeneralinfoComponent } from './signup/generalinfo/generalinfo.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { LoginComponent } from './login/login.component';
import { RoutemapComponent } from './signup/routemap/routemap.component';
import { NavbarComponent } from './navbar/navbar.component';
import { D_NotificationComponent } from './Driver/D_notification/D_notification.component';
import { SidebarComponent } from './Driver/sidebar/sidebar.component';
import { C_SidebarComponent } from './Customer/c_sidebar/c_sidebar.component';
import { CaptainComponent } from './Driver/captain/captain.component';
import { UserComponent } from './Customer/user/user.component';
import { ThemeComponent } from './Customer/theme/theme.component';
import { RidesComponent } from './Driver/rides/rides.component';
import { Add_RouteComponent } from './Driver/routes/add_Route/add_Route.component';
import { MyBookingsComponent } from './customer/my-bookings/my-bookings.component';
import { LoaderComponent } from './loader/loader.component';
import { AttributesComponent } from './signup/attributes/attributes.component';
import { RoutesComponent } from './Driver/routes/routes.component';
import { ReviewComponent } from './Customer/theme/review/review.component';
import { NotificationComponent } from './Customer/notification/notification.component';
import { ProfileComponent } from './Driver/profile/profile.component';
import { ObjectComponent } from './Customer/current/object.component';
import { C_profileComponent } from './Customer/c_profile/c_profile.component';
import { SettingsComponent } from './Admin/settings/settings.component';
import { A_sidebarComponent } from './Admin/a_sidebar/a_sidebar.component';
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    ProfileComponent,
    C_profileComponent,
    VehicleinfoComponent,
    GeneralinfoComponent,
    LandingpageComponent,
    LoginComponent,
    NotificationComponent,
    D_NotificationComponent,
    RoutemapComponent,
    NavbarComponent,
    SidebarComponent,
    C_SidebarComponent,
    CaptainComponent,
    UserComponent,
    ThemeComponent,
    RidesComponent,
    Add_RouteComponent,
    MyBookingsComponent,
    LoaderComponent,
    AttributesComponent,
    RoutesComponent,
    ReviewComponent,
    ObjectComponent,
    SettingsComponent,
    A_sidebarComponent
   ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    //NgxStarRatingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
    // FontAwesomeModule,
    AmexioLayoutModule,
    AmexioWidgetModule,
    AmexioEnterpriseModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB6NeN5Q5VygIWwneagajZHad3Pcevcgt8',
      //libraries: ['geometry','']
    }),
    RouterModule.forRoot([
      {path: '', component: LandingpageComponent, pathMatch: 'full' },
      {path: 'vehicle', component: VehicleinfoComponent },
      {path: 'attribute', component: AttributesComponent},
      {path: 'signup', component: SignupComponent},
      {path: 'routemap', component: RoutemapComponent},
      {path: 'login', component : LoginComponent},
      {path: 'general', component: GeneralinfoComponent},
      {path: 'captain', component: CaptainComponent},
      {path: 'user', component: UserComponent},
      {path: 'theme', component: ThemeComponent},
      {path: 'rides', component: RidesComponent},
      {path: 'addroute', component: Add_RouteComponent},
      {path: 'mybookings', component: MyBookingsComponent},
      {path: 'loader', component: LoaderComponent},
      {path: 'attributes', component: AttributesComponent},
      {path: 'routes', component: RoutesComponent},
      {path: 'passenger', component:ReviewComponent},
      {path: 'notify', component:NotificationComponent},
      {path: 'dnotify', component:D_NotificationComponent},
      {path: 'profile', component:ProfileComponent},
      {path: 'c_profile', component:C_profileComponent},
      {path: 'object', component:ObjectComponent },
      {path: 'settings', component: SettingsComponent}
    ]),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
