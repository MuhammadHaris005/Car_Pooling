import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignUpService } from '../../general.service';
import { GlobalService } from '../../global.service';
declare const $ :any;
@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {

  list:any;
  constructor(private service: SignUpService,private router: Router) { }


  ngOnInit() {
    if(GlobalService.role!="passenger"){
      this.router.navigate(['/login']);
    }
    this.bookingList();
  }
  bookingList(){
    var phone = GlobalService.PhoneNo;
    this.service.GetCaptainMethod("api/Captain/","GetBookings",{'u_phone':phone}).subscribe(response => {
      if(response){
        debugger;
        response= response.map(response=>({...response.captianInfo,...response.vehicle,...response.booking}))
        this.list = response;
        setTimeout(function(){ $("#datatable").DataTable()}, 500);
      }
    });
  }
  Cancelbooking(x){
    debugger;
    let booking_id = x.id;
    let id = x.order_id;
    let P1 = x.s_point;
    let P2 = x.e_point;
    let seats = x.seats;
    this.service.PostMethod("api/User/","UpdateBookSeats",{id,booking_id,P1,P2,seats}).subscribe(resp=>{
      if(resp){
        alert("Deleted.....");
        this.bookingList();
        let sender = GlobalService.PhoneNo;
          let reciever = x.d_phone;
          let message = " Cancel booking with you";
          this.service.PostMethod("api/User/","SendNotification",{sender,reciever,message}).subscribe();
      }
    })
  }

}
