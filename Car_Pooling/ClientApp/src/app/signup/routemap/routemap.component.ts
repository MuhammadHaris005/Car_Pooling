import { Component, OnInit, Output,EventEmitter } from "@angular/core";
import { SignupComponent } from "../signup.component";
import{MouseEvent} from '@agm/core'
import { Router } from "@angular/router";
import { Global } from "../signup_global";
import { SignUpService } from "src/app/general.service";
@Component({

  selector : 'app-routemap',
  templateUrl : './routemap.component.html',
  styleUrls:['./routemap.component.css']
})
export class RoutemapComponent{

  zoom: number = 10;

  // initial center position for the map
  lat: number = 33.70880;
  lng: number = 73.06554;
  
  constructor( private route:Router,private postservices: SignUpService){

  }

  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng : $event.coords.lng,
      draggable: true
    });
  }
  markerDragEnd(m:any, $event: MouseEvent) {
    m.lat = $event.coords.lat;
    m.lng = $event.coords.lng;
  }

  markers: marker[] = [
  ]
  SavePoints(){
    var mappoints = JSON.stringify(this.markers);
    var phoneNo = Global.personaldata.phoneNo;
    this.postservices.PostMethod("api/Captain/","General", Global.personaldata).subscribe(response => {
      if(response == true){
        this.postservices.PostMethod("api/Captain/","Vehicle",Global.vehicledata).subscribe(response => {
          if(response == true){
            debugger
            this.postservices.PostMethod("api/Captain/","Routes",{'mappoints':mappoints,'phoneNo':phoneNo}).subscribe(response => {
              if(response == true){
                //swal("Good job!", "You clicked the button!", "success");
              }
              else{
                alert("api Error");
              }
            });
          }
          else{
            alert("Api Error")
          }
        });
      }
      else{
        alert("Api Error")
      }
    });
    this.route.navigate(['/signup']);
  }

}
interface marker {
	lat: number;
	lng: number;
  label?: string;
	draggable: boolean;
}
