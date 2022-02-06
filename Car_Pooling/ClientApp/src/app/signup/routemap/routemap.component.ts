import { Component, OnInit, Output,EventEmitter } from "@angular/core";
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

  zoom:number= 10;

  // initial center position for the map
  lat:number= 33.70880;
  lng:number= 73.06554;
  source:any;
  destination:any;
  constructor( private route: Router, private postservices: SignUpService){

  }

  mapClicked($event: MouseEvent) {
    let url = "http://maps.google.com/mapfiles/ms/icons/";
        url += 'green' + "-dot.png";
    let url1 = "http://maps.google.com/mapfiles/ms/icons/";
        url1 += 'red' + "-dot.png";
    let url2 = "http://maps.google.com/mapfiles/ms/icons/";
        url2 += 'blue' + "-dot.png";
        if(this.markers.length>=2){
          debugger;
          this.markers = [...this.markers.slice(0, this.markers.length - 1), {lat: $event.coords.lat,
            lng : $event.coords.lng,
            iconUrl :url2,
            label: "",
            draggable: true}, this.markers[this.markers.length - 1]]
        }
        else{
          if(this.markers.length==1){
            this.markers.push({
              lat: $event.coords.lat,
              lng : $event.coords.lng,
              iconUrl : url1,
              label: "Dest",
              draggable: true
            });
          }
          else{
            this.markers.push({
              lat: $event.coords.lat,
              lng : $event.coords.lng,
              iconUrl : url,
              label: "Source",
              draggable: true
            });
          }
        }
  }
  markerDragEnd(m:any, $event: MouseEvent) {
    m.lat = $event.coords.lat;
    m.lng = $event.coords.lng;
  }

  markers: marker[] = []
  SavePoints(){
    debugger;
    var mappoints = JSON.stringify(this.markers);
    var phoneNo = Global.personaldata.phoneNo;
    var source = this.source;
    var destination = this.destination;
    // this.postservices.PostMethod("api/Captain/","General", Global.personaldata).subscribe(response => {
    //   if(response == true){
    //     this.postservices.PostMethod("api/Captain/","Vehicle",Global.vehicledata).subscribe(response => {
    //       if(response == true){
    //         this.postservices.PostMethod("api/Captain/","Habits",Global.habits).subscribe(response => {
    //           if(response == true){
    //             debugger
    //             this.postservices.PostMethod("api/Captain/","Routes",{'mappoints':mappoints,'phoneNo':phoneNo,'source':source,'destination':destination,'status':true}).subscribe(response => {
    //               if(response == true){
    //                 alert("Registration Successfully.......");
    //               }
    //               else{
    //                 alert("api Error");
    //               }
    //             });
    //           }
    //           else{
    //             alert("Api Error")
    //           }
    //         });
    //       }
    //       else{
    //         alert("Api Error")
    //       }
    //     });
    //   }
    //   else{
    //     alert("Api Error")
    //   }
    // });
    this.route.navigate(['/login']);
  }

}
interface marker {
	lat: number;
	lng: number;
  iconUrl:string | google.maps.Icon | google.maps.Symbol;
  label?: string;
	draggable: boolean;
}
