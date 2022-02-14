import { Component, OnInit } from '@angular/core';
import { SignUpService } from 'src/app/general.service';
import { GlobalService } from 'src/app/global.service';
import { DriverGlobalService } from '../driver.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  Sum : any;
  constructor( private service : SignUpService) { }

  ngOnInit() {

  }

  // getNotification(){
  //   let reciever = GlobalService.PhoneNo;
  //   this.service.PostMethod("api/User/","GetNotifications",{reciever}).subscribe(responce =>{
  //     if(responce){
  //       DriverGlobalService.notifylist = responce;
  //       this.Sum = responce.length;
  //       debugger;
  //     }
  //   });
  // }
}
