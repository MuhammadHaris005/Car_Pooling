import { Component, OnInit } from '@angular/core';
import { DriverGlobalService } from '../Driver/driver.service';
import { SignUpService } from '../general.service';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  Sum : any;
  list: any;
  constructor( private service : SignUpService) { }

  ngOnInit() {
    this.getNotification();
  }

  getNotification(){
    debugger;
    let reciever = GlobalService.PhoneNo;
    this.service.PostMethod("api/User/","GetNotifications",{reciever}).subscribe(responce =>{
      if(responce.length>0){
        DriverGlobalService.notifylist = responce;
        this.Sum = responce.length;
        debugger;
        this.list = DriverGlobalService.notifylist;
      }
    });
  }
  RemoveNotif(){
    let reciever = GlobalService.PhoneNo;
    this.service.UpdateStatus("api/User/","UpdateNotify",{reciever}).subscribe();
  }

}
