import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core'
//import { FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AmexioLayoutModule,AmexioWidgetModule} from 'amexio-ng-extensions'; ''
import {AmexioEnterpriseModule} from 'amexio-ng-extensions';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SignupComponent} from './signup/signup.component'
import { VehicleinfoComponent } from './signup/vehicleinfo/vehicleinfo.component';
import { GeneralinfoComponent } from './signup/generalinfo/generalinfo.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { LoginComponent } from './login/login.component';
import { RoutemapComponent } from './signup/routemap/routemap.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CaptainComponent } from './Driver/captain/captain.component';
import { UserComponent } from './Customer/user/user.component';
import { ThemeComponent } from './Customer/theme/theme.component';
import { RidesComponent } from './Driver/rides/rides.component';
import { Add_RouteComponent } from './Driver/captain/add_Route/add_Route.component';
import { MyBookingsComponent } from './customer/my-bookings/my-bookings.component';
import { LoaderComponent } from './loader/loader.component';
import { AttributesComponent } from './signup/attributes/attributes.component';
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    VehicleinfoComponent,
    GeneralinfoComponent,
    LandingpageComponent,
    LoginComponent,
    RoutemapComponent,
    NavbarComponent,
    SidebarComponent,
    CaptainComponent,
    UserComponent,
    ThemeComponent,
    RidesComponent,
    Add_RouteComponent,
    MyBookingsComponent,
    LoaderComponent,
    AttributesComponent
   ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    //FontAwesomeModule,
    AmexioLayoutModule,
    AmexioWidgetModule,
    AmexioEnterpriseModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB6NeN5Q5VygIWwneagajZHad3Pcevcgt8',
      libraries: ['geometry']
    }),
    RouterModule.forRoot([
      {path: '', component: LandingpageComponent, pathMatch: 'full' },
      {path:'routemap', component: RoutemapComponent},
      {path: 'vehicle', component: VehicleinfoComponent },
      {path:'general', component:GeneralinfoComponent},
      {path:'signup', component: SignupComponent},
      {path:'login', component : LoginComponent},
      {path :'captain', component: CaptainComponent},
      {path:'user', component:UserComponent},
      {path:'theme', component:ThemeComponent},
      {path:'rides',component:RidesComponent},
      {path:'addroute',component:Add_RouteComponent},
      {path:'mybookings',component:MyBookingsComponent},
      {path:'loader',component:LoaderComponent},
      {path:'attributes',component:AttributesComponent}

    ]),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
