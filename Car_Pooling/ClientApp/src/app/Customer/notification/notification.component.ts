import { Component, OnInit } from '@angular/core';
import { UserGlobalService } from '../notify';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor() { }

  list;
  ngOnInit() {
    this.list = UserGlobalService.notifylist;
  }

}
