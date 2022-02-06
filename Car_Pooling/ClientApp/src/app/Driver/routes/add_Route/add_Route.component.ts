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

  zoom: number = 5;

  // initial center position for the map
  lat: number = 33.708805656;
  lng: number = 73.065545454;
  phone: any;
  points :any;
  source:any;
  destination:any;
  constructor( private route:Router, private service:SignUpService){

  }

  ngOnInit() {
    if(GlobalService.role!="driver"){
      this.route.navigate(['/login']);
    }
    this.setCurrentLocation();
  }
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 12;
      });
    }
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
  markerDragEnd(m:any,$event: MouseEvent) {
    m.lat = $event.coords.lat;
    m.lng = $event.coords.lng;
  }
  markerclick(m:any,$event: MouseEvent){
    this.markers = this.markers.filter(a=>a !== m)
  }
  markers : marker[] =[];

  SavePoints(){
    this.points=""
    this.points = JSON.stringify(this.markers);
    this.Save();

  }
  Save(){
    debugger
    var mappoints = this.points;
    var phoneNo = GlobalService.PhoneNo;
    var source = this.source;
    var destination = this.destination;
    if(mappoints.length>2){
      this.service.PostMethod("api/Captain/","Routes",{mappoints,phoneNo,source,destination,'status':false}).subscribe(response => {
        if(response == true){
          alert("Route Added Successfully");
        }
        else{
          alert("api Error");
        }
      });
    }
    else{
      alert("Select Complete Route...");
    }

  }

}
interface marker {
	lat: number;
	lng: number;
  label?: string;
  iconUrl:string | google.maps.Icon | google.maps.Symbol;
	draggable: boolean;
}
