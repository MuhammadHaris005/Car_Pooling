import { Component, OnInit } from '@angular/core';
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
  constructor(private service: SignUpService) { }


  ngOnInit() {
    var phone = GlobalService.PhoneNo;
    this.service.GetCaptainMethod("api/Captain/","GetBookings",{'u_phone':phone}).subscribe(response => {
      if(response!= null){
        debugger;
        this.list = response;
      }
    });
    $("#datatable").DataTable();


  }

}
