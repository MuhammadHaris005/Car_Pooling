import { Component, OnInit } from '@angular/core';
import { SignUpService } from 'src/app/general.service';
import { GlobalService } from 'src/app/global.service';
import { UserGlobalService } from '../notify';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(private service : SignUpService) { }

  list;
  ngOnInit() {
    this.list = UserGlobalService.notifylist;
    let reciever = GlobalService.PhoneNo;
    this.service.UpdateStatus("api/User/","UpdateNotify",{reciever}).subscribe();
  }

}
