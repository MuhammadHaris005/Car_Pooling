import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignUpService } from 'src/app/general.service';
import { GlobalService } from 'src/app/global.service';
import { DriverGlobalService } from '../driver.service';
import { ModalService } from 'src/app/_modal';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css']
})
export class RoutesComponent implements OnInit {

  list:any;
  phoneNo:any;
  points;
  longitude ;
  latitude ;

  constructor(private service: SignUpService, private route: Router,private modalService: ModalService) {

   }

  ngOnInit() {
    if(GlobalService.role!="driver"){
      this.route.navigate(['/login']);
    }
    this.CheckVehicle();
    this.get();
  }
  CheckVehicle(){
    let phone = GlobalService.PhoneNo;
    this.service.PostMethod("api/Home/","CheckVehicle",{'phone':phone}).subscribe(responce=>{
      if(responce==false){
        alert("Kindly add Vehicle Details");
        this.route.navigate(["/vehicle"])
      }
    });
  }
    openModal(id: string,apoints:any) {
      debugger;
      this.points = eval(apoints);
      this.latitude = this.points[2].lat;
      this.longitude = this.points[2].lng;
      this.modalService.open(id);
  }

  closeModal(id: string) {
      this.modalService.close(id);
  }
  get(){
    this.phoneNo = GlobalService.PhoneNo;
    this.service.GetPointsMethod("api/Captain/","GetPoints",{'phoneNo':this.phoneNo}).subscribe(response => {
      if(response!= null){
        debugger;
        this.list = response;
        for(let i=0;i<response.length;i++){
          if(response[i].status==true){
            DriverGlobalService.routeID=response[i].id;
          }
        }
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
  Delete(id){
    debugger;
    let ID = id;
    this.service.PostMethod("api/Home/","DeleteRoute",{'ID':ID}).subscribe(res=>{
      if(res == true){
        alert("Route Deleted...")
      }
    });
  }
}
