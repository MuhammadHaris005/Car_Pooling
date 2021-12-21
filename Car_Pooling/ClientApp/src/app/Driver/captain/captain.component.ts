import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../global.service';
import { SignUpService } from '../../general.service';

declare const $ :any;
@Component({
  selector: 'app-captain',
  templateUrl: './captain.component.html',
  styleUrls: ['./captain.component.css']
})
export class CaptainComponent implements OnInit {
  points:any;
  phoneNo:string;
  latitude:any;
  longitude:any;
  previous;
  Stime:any;
  Rtime:any;
  istwoway:any;
  showfield:boolean=false;
  labels=["Start"];

  triptype:any;
  showDate :boolean= false;
  ShowHide() {
    this.showfield = this.showfield ? false : true;
  }
  constructor(private signupservices: SignUpService) {
    this.phoneNo = "";
  }
  ngOnInit() {
    debugger;
    this.phoneNo = GlobalService.PhoneNo;
    this.signupservices.GetPointsMethod("api/Captain/","GetPoints",{'phoneNo':this.phoneNo}).subscribe(response => {
      if(response!= null){
        //response.stringify;
        alert(JSON.stringify(response));
        debugger;
        for(let a of response){
          if(a.status==true){
            this.points = eval(a.mappoints);
            this.latitude = this.points[2].lat;
            this.longitude = this.points[2].lng;
          }
        }
        this.findDistance();
        debugger;
        this.FindSets(this.points);
      }
      else{
        alert("Error");
      }
    });
  }
  findDistance(){
    for (let i = 0; i < this.points.length-1; i++) {
      var d = this.getDistanceFromLatLonInKm(this.points[i].lat,this.points[i].lng,this.points[i+1].lat,this.points[i+1].lng);
      this.labels.push(d+" km");
    }
  }
  clickedMarker(infowindow) {
    if (this.previous) {
        this.previous.close();
    }
    this.previous = infowindow;
  }

  changetype($event){
    debugger;
    var type = $event.target.value;
    if(type=="Once"){
      this.showDate = false;
    }
    else
      this.showDate = true;
  }
  SaveTime(){
    var stime = this.Stime;
    var phoneNo = GlobalService.PhoneNo;
    var time = new Date().toLocaleString('en-US', { hour: 'numeric',minute:'numeric', hour12: true });
    debugger;
    if(stime>time && stime!=undefined){
      this.signupservices.PostMethod("api/Captain/","UpdateTime",{'phoneNo':phoneNo,'stime':stime}).subscribe(response => {
        if(response==true){
          alert("Time Updated");
        }
      });
      if(this.istwoway==true && this.Rtime!=undefined){
        this.points.reverse();
        var mappoints = JSON.stringify(this.points);
        var rtime = this.Rtime;
        this.signupservices.PostMethod("api/Captain/","Routes",{mappoints,phoneNo,'stime':rtime}).subscribe(response => {
          if(response == true){

          }
        });
      }
    }
    else{
      alert("Select Correct Time")
    }

  }
  set=[];
  FindSets(a){
    debugger;
    for (let i = 0; i < a.length; i++) {
      for (let j = i+1; j < a.length; j++) {
        this.set.push([a[i],a[j]]);
      }
    }
    //alert(JSON.stringify(this.set));
  }
  getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1);
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
  }

 deg2rad(deg) {
    return deg * (Math.PI/180)
  }

}
interface Sets{
  P1:any;
  P2:any;
  seats:any;
}
