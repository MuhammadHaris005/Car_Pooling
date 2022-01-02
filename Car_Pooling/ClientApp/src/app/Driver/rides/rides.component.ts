import { Component, OnInit } from '@angular/core';
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
  constructor(private service : SignUpService) {
    this.phoneNo = GlobalService.PhoneNo;
    this.route_ID = DriverGlobalService.routeID;
  }

  ngOnInit() {
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
  Cancel(id){
    debugger;
    this.service.Delete("api/Captain/","DeleteRide",{'Offer_ID':id}).subscribe(res=>{
      if(res !=null){
        alert("Ride cancel Successfully....")
        this.GetRides(this.route_ID);
      }
      else{
        alert("Error");
      }
    })
  }

}


