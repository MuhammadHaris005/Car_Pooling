import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignUpService } from 'src/app/general.service';
import { GlobalService } from 'src/app/global.service';
import { DriverGlobalService } from '../driver.service';
import { ModalService } from 'src/app/_modal';
import{MouseEvent} from '@agm/core'
@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css']
})
export class RoutesComponent implements OnInit {

  list:any;
  points1;
  phoneNo:any;
  longitude ;
  latitude ;
  zoom: number = 5;

  // initial center position for the map
  lat: number = 33.708805656;
  lng: number = 73.065545454;
  phone: any;
  points :any;
  source:any;
  destination:any;
  constructor(private service: SignUpService, private route: Router,private modalService: ModalService) {

   }

  ngOnInit() {
    if(GlobalService.role!="driver"){
      this.route.navigate(['/login']);
    }
    else
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
      this.points1 = eval(apoints);
      this.latitude = this.points1[2].lat;
      this.longitude = this.points1[2].lng;
      this.modalService.open(id);
  }
  openModal2(id: string) {
    debugger;
    this.setCurrentLocation();
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
        this.get();
      }
    });
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
    if(this.source && this.destination == ""){
      alert("Enter Source And Destination Name..")
    }
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
          this.closeModal('custom-modal-2');
          this.get();
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
