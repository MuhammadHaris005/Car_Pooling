import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignUpService } from 'src/app/general.service';
import { GlobalService } from 'src/app/global.service';
import { ModalService } from 'src/app/_modal';
import { DriverGlobalService } from '../driver.service';

@Component({
  selector: 'app-rides',
  templateUrl: './rides.component.html',
  styleUrls: ['./rides.component.css']
})
export class RidesComponent implements OnInit,AfterViewInit {

  phoneNo:any;
  route_ID:any;
  list:any=[];
  person:any=[];
  constructor(private service : SignUpService,private router:Router,private modalService: ModalService) {
    this.phoneNo = GlobalService.PhoneNo;
    this.route_ID = DriverGlobalService.routeID;
  }

  openModal(id: string) {
    debugger;
    this.modalService.open(id);
  }

  closeModal(id: string) {
      this.modalService.close(id);
  }
  ngOnInit() {
    if(GlobalService.role!="driver"){
      this.router.navigate(['/login']);
    }

  }
  ngAfterViewInit(): void {
    this.list=[];
    this.GetRides(this.route_ID);
  }
  GetRides(x){
    let route_ID = x;
    this.service.Searching("api/Captain/","GetOfferRides",{route_ID}).subscribe(res =>{
      if(res!=null){
        debugger;
        for(let a of res){
          let t = new Date(a.date);
          a.date = t;
          a.endDate = new Date(a.endDate);
        }
        this.list = res;
      }
    });
  }
  UpdateStatus(Offer_ID,ridestatus){
    debugger;
    this.service.PostMethod("api/Home/","updateOfferStatus",{'Offer_ID':Offer_ID,'ridestatus':ridestatus}).subscribe();
    this.GetRides(this.route_ID);
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
          let message = " Cancel his ride from "+source+" to "+dest;
          this.service.PostMethod("api/User/","SendNotification",{sender,reciever,message}).subscribe();
        }
        this.GetRides(this.route_ID);
      }
      else{
        alert("Error");
      }
    })
  }

  GetBookings(order_id){
    this.service.Searching("api/User/","GetBookRides",{order_id}).subscribe(response =>{
      if(response!=null){
        debugger;
        for(let a of response){
          a.booking.exp_time = new Date(a.booking.exp_time);
        }
        //response.exp_time = new Date(response.exp_time);
        response= response.map(response=>({...response.captianInfo,...response.booking}))
        this.person = response;
        debugger;
        this.openModal('custom-modal-1');
      }
    });
  }

}


