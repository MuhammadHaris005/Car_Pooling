import { Component, OnInit } from '@angular/core';
import { DriverGlobalService } from '../driver.service';

@Component({
  selector: 'app-d_notification',
  templateUrl: './D_notification.component.html',
  styleUrls: ['./D_notification.component.css']
})
export class D_NotificationComponent implements OnInit {

  constructor() { }

  list:any;
  ngOnInit() {
    this.list = DriverGlobalService.notifylist;
  }

}
