import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignUpService } from 'src/app/general.service';
import { GlobalService } from 'src/app/global.service';
import { DriverGlobalService } from '../driver.service';

@Component({
  selector: 'app-rides',
  templateUrl: './rides.component.html',
  styleUrls: ['./rides.component.css']
})
export class RidesComponent implements OnInit {

  phoneNo:any;
  route_ID:any;
  list:any;
  constructor(private service : SignUpService,private router:Router) {
    this.phoneNo = GlobalService.PhoneNo;
    this.route_ID = DriverGlobalService.routeID;
  }

  ngOnInit() {
    if(GlobalService.role!="driver"){
      this.router.navigate(['/login']);
    }
    this.list=[];
    this.GetRides(this.route_ID);
  }

  GetRides(x){
    let route_ID = x;
    this.service.Searching("api/Captain/","GetOfferRides",{route_ID}).subscribe(res =>{
      if(res!=null){
        debugger;
        this.list = res;
      }
    });
  }
  UpdateStatus(Offer_ID,ridestatus){
    debugger;
    this.service.Delete("api/Home/","updateOfferStatus",{'Offer_ID':Offer_ID,'ridestatus':ridestatus}).subscribe();
  }
  Cancel(Offer_ID,source,dest){
    debugger;
    this.service.Delete("api/Captain/","DeleteRide",{'Offer_ID':Offer_ID}).subscribe(res=>{
      if(res !=null){
        alert("Ride cancel Successfully....")
        debugger;
        for(let a of res)
        {
          let sender = GlobalService.PhoneNo;
          let reciever = a;
          let message = "Owner cancel his ride from "+source+" to "+dest;
          this.service.PostMethod("api/User/","SendNotification",{sender,reciever,message}).subscribe();
        }
        let to = res;
        this.GetRides(this.route_ID);

      }
      else{
        alert("Error");
      }
    })
  }

}


