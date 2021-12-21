import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignUpService } from 'src/app/general.service';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css']
})
export class RoutesComponent implements OnInit {

  list:any;
  phoneNo:any;


  constructor(private service: SignUpService, private route: Router) {
    if(GlobalService.role!="driver"){
      this.route.navigate(['/login']);
    }
    this.get();
   }

  ngOnInit() {

  }

  get(){
    this.phoneNo = GlobalService.PhoneNo;
    this.service.GetPointsMethod("api/Captain/","GetPoints",{'phoneNo':this.phoneNo}).subscribe(response => {
      if(response!= null){
        //response.stringify;
        debugger;
        //alert(JSON.stringify(response));
        this.list = response;
      }
      else{
        alert("Error");
      }
    });
  }
  function($event,e) {
    debugger;
    let status= $event.target.checked;
    let phoneNo = GlobalService.PhoneNo;
    let ID = e;
      this.service.UpdateStatus("api/Captain/","UpdateStatus",{phoneNo,ID,status}).subscribe(response => {
        debugger;
        if(response=true){
          this.get();
        }
      });
  }


}
