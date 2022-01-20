import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/global.service';
import { SignUpService } from '../../general.service';
import { UserGlobalService } from '../notify';

@Component({
  selector: 'app-csidebar',
  templateUrl: './c_sidebar.component.html',
  styleUrls: ['./c_sidebar.component.css']
})
export class C_SidebarComponent implements OnInit {

  list : any;
  Sum : any;
  constructor(private service: SignUpService) { }

  ngOnInit() {
    this.getNotification();
  }
  getNotification(){
    let reciever = GlobalService.PhoneNo;
    this.service.PostMethod("api/User/","GetNotifications",{reciever}).subscribe(responce =>{
      if(responce){
        UserGlobalService.notifylist = responce;
        this.Sum = responce.length;
      }
    });
  }

}
