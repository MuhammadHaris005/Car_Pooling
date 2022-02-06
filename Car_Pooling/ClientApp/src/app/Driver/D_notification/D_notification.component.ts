import { Component, OnInit } from '@angular/core';
import { SignUpService } from 'src/app/general.service';
import { GlobalService } from 'src/app/global.service';
import { DriverGlobalService } from '../driver.service';

@Component({
  selector: 'app-d_notification',
  templateUrl: './D_notification.component.html',
  styleUrls: ['./D_notification.component.css']
})
export class D_NotificationComponent implements OnInit {

  constructor(private service: SignUpService) { }

  list:any;
  ngOnInit() {
    this.list = DriverGlobalService.notifylist;
    let reciever = GlobalService.PhoneNo;
    this.service.UpdateStatus("api/User/","UpdateNotify",{reciever}).subscribe();
  }

}
