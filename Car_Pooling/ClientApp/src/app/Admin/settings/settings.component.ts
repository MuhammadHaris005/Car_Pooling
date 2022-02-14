import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SideNavNodeComponent } from 'amexio-ng-extensions';
import { SignUpService } from 'src/app/general.service';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  Initial:any;
  perKm:any;s

  constructor(private router : Router, private service: SignUpService) { }

  ngOnInit() {
    if(GlobalService.role!="Admin"){
      this.router.navigate(['/login']);
    }
    this.GetFare();
  }

  GetFare(){
    debugger;
    this.service.GetRides("api/Home/","GetFare").subscribe(responce=>{
      if(responce){
        debugger;
        this.Initial = responce[0].initialfare;
        this.perKm = responce[0].perKm;
      }
    });
  }
  UpdateFare(){
    debugger;
    let initialfare = this.Initial;
    let perKm = this.perKm;
    this.service.PostMethod("api/Home/","UpdateFare",{initialfare,perKm}).subscribe();
    alert("Settings Update..")
  }
}
