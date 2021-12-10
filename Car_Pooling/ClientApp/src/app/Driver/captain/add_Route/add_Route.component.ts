import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{MouseEvent} from '@agm/core'
import { GlobalService } from 'src/app/global.service';
import { SignUpService } from 'src/app/general.service';

@Component({
  selector: 'app-add_Route',
  templateUrl: './add_Route.component.html',
  styleUrls: ['./add_Route.component.css']
})
export class Add_RouteComponent implements OnInit {

  zoom: number = 10;

  // initial center position for the map
  lat: number = 33.70880;
  lng: number = 73.06554;
  phone: any;
  points :any;
  index=1;
  constructor( private route:Router, private service:SignUpService){

  }

  ngOnInit() {
  }

  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng : $event.coords.lng,
      draggable: true
    });
  }
  markerDragEnd($event: MouseEvent) {
  }

  markers: marker[] = [
  ]

  SavePoints(){
    this.points=""
    this.points = JSON.stringify(this.markers);
    this.Save();

  }
  Save(){
    debugger
    var mappoints = this.points;
    var phone = GlobalService.PhoneNo
    this.service.PostMethod("api/Captain/","Routes",{mappoints,phone}).subscribe(response => {
      if(response == true){
        alert("Route Added Successfully");
      }
      else{
        alert("api Error");
      }
    });
  }

}
interface marker {
	lat: number;
	lng: number;
  label?: string;
	draggable: boolean;
}
