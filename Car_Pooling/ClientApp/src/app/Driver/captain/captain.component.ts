import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../global.service';
import { SignUpService } from '../../general.service';
import { DriverGlobalService } from '../driver.service';
import { Router } from '@angular/router';

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
  //Stime= new Date().getTime().toLocaleString();
  Rtime:any;
  type:any="Once";
  Date=new Date();
  endDate = new Date();
  istwoway:any;
  showfield:boolean=false;
  labels=["Start"];

  id:any;
  seats:any;
  miles:any=0.5;

  showDate :boolean= true;
  showDays:boolean=false;

  Mon=true;
  Tue=true;
  Wed=true;
  Thu=true;
  Fri=true;
  Sat=true;
  Sun=true;
  s:any;


  ShowHide() {
    debugger;
    this.showfield = this.showfield ? false : true;
  }
  constructor(private signupservices: SignUpService,private router:Router) {
    this.phoneNo = "";
  }
  ngOnInit() {

    if(GlobalService.role!="driver"){
      this.router.navigate(['/login']);
    }
    debugger;
    // $.SweetAlert.init();

    //setTimeout(function(){ $("#sa-success").SweetAlert().init()}, 500);
    this.phoneNo = GlobalService.PhoneNo;
    this.signupservices.GetPointsMethod("api/Captain/","GetPoints",{'phoneNo':this.phoneNo}).subscribe(response => {
      if(response.length!=0){
        debugger;
        for(let a of response){
          if(a.status==true){
            debugger;
            this.points = eval(a.mappoints);
            this.latitude = this.points[2].lat;
            this.longitude = this.points[2].lng;
            this.id = a.id;
            this.seats = a.seats;
            this.s = a.seats;
            DriverGlobalService.routeID=a.id;
          }
        }
        this.findDistance();
      }
      else{
        alert("Kindly add Route.....");
      }
    });
  }
  findDistance(){
    debugger;
    for (let i = 0; i < this.points.length -1; i++) {
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
      this.showDays =false;
      this.showDate = true;
    }
    if(type=="Daily"){
      this.showDate = true;
      this.showDays = true;
    }

  }
  timeArr=[];
  calculateTime(time2:Date){
    let time = new Date(time2);
    let tim = new Date(time2);
    this.timeArr.push(tim);
    for(let i=1;i<this.labels.length;i++){
      let h = parseFloat(this.labels[i])/0.5;
      time.setMinutes(time.getMinutes()+h);
      let t = new Date(time);
      debugger;
      this.timeArr.push(t);

    }
  }
  SaveTime(e){
    let s_time = new Date(this.Date);
    var r_time = this.Rtime;
    var phoneNo = GlobalService.PhoneNo;
    var today = new Date();
    let route_ID = e;
    var type = this.type;
    var date = new Date(this.Date);
    var endDate = new Date(this.endDate);
    let seats_offer = this.seats;
    let totalpoints = this.points.length;
    let distance = this.miles;
    debugger;
    this.calculateTime(this.Date);
    let e_time = this.timeArr;
    let days = [this.Mon, this.Tue,this.Wed,this.Thu,this.Fri,this.Sat,this.Sun].toLocaleString();
    var time = new Date();
    debugger;

    if(today<date  && s_time!=undefined && date!=undefined){
      if(type=="Once"){
        days=null;
        endDate = date;
      }
      this.signupservices.PostMethod("api/Captain/","Offer",{route_ID,type,seats_offer,date,endDate,s_time,r_time,days,totalpoints,e_time,distance}).subscribe(response => {
        if(response==true){
          alert("Ride Offer Succcessfully");
        }
      });
    }
    else{
      alert("Select Correct Time")
    }

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


