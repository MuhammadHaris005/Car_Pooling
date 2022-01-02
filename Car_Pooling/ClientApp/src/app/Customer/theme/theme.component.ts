import { Component } from '@angular/core';
import { SignUpService } from '../../general.service';
import{MouseEvent} from '@agm/core'
import { GlobalService } from '../../global.service';
import { Router } from '@angular/router';
import { getLocaleDateFormat } from '@angular/common';

 @Component({
    selector: 'app-theme',
    templateUrl:'./theme.component.html',
    styleUrls: ['./theme.component.css']
 })
  export class ThemeComponent {
    seats=1;
    available_seats:number=0;
    extime;

    Mon=true;
    Tue=true;
    Wed=true;
    Thu=true;
    Fri=true;
    Sat=true;
    Sun=true;

    lat:number;
    lng:number;
    zoom:number= 10;
    center:any;
    time = new Date();

    seatsArray=[];
    driversdetails =[];
    vehicledetails=[];
    routedetails=[];
    exp_time=[];

    bookings: Booking[]=[];

    showDate :boolean= false;
    showDays:boolean=false;
    Date=new Date();
    type:any;
    showMainContent: Boolean = true;

    mapClicked($event: MouseEvent) {
      let url = "http://maps.google.com/mapfiles/ms/icons/";
        url += 'green' + "-dot.png";
        let url1 = "http://maps.google.com/mapfiles/ms/icons/";
        url1 += 'red' + "-dot.png";
      if(this.markers.length==2){
        alert("Select only Source and Destination")
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
    Cancel(){
      this.driversdetails=[];
      this.vehicledetails=[];
      this.bookings =[];
      this.seatsArray = [];
      this.routedetails=[];
      this.exp_time = [];
      this.ShowHideButton();
    }

    ShowHideButton() {
      this.showMainContent = this.showMainContent ? false : true;
    }
    constructor(private signupservices: SignUpService,private router : Router) {
      //this.time = new Date();

    }

    ngOnInit() {

      if(GlobalService.role!="passenger"){
        this.router.navigate(['/login']);
      }
      this.setCurrentLocation();

      //  navigator.geolocation.getCurrentPosition((position) => {
      //   this.center = {
      //     lat: position.coords.latitude,
      //     lng: position.coords.longitude,
      //   }
      // })
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
    decrement(){
      if(this.seats!=1){
        this.seats=this.seats-1;
      }
    }

    increment(){
      if(this.seats<4){
      this.seats=this.seats+1;
      }
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
    SearchRide(){
      debugger;
      if(this.markers.length==0 || this.type==undefined){
        if(this.type==undefined){
          alert("Select Ride Type");
        }
        else
          alert("Select Source and Destination...");
      }
      else
      {
        var date = new Date(this.Date);
        if(date<this.time){
          alert("Select date and Time Correct...");
        }
        else{
          var type = this.type;
          this.available_seats=10;
        this.signupservices.Searching("api/Captain/","Searching",{type,date}).subscribe(response => {
      /* this.signupservices.GetRides("api/Captain/","GetRides"). */
        if(response!= null){
          for (let i = 0; i < response.length; i++) {
            if(response[i].status==true ){
              let a  =eval(response[i].mappoints) ;
              for (let j = 0; j < a.length; j++) {
                var d = this.getDistanceFromLatLonInKm(a[j].lat,a[j].lng,this.markers[0].lat,this.markers[0].lng);
                if(d<1){
                  debugger;
                  let P1 = j;
                  for (let x = j; x < a.length; x++) {
                    var z = this.getDistanceFromLatLonInKm(a[x].lat,a[x].lng,this.markers[1].lat,this.markers[1].lng);
                    if(z<1){
                      let P2 = x;
                      let id = response[i].id;
                      var s =this.seats;
                      this.CHeckSeats(P1,P2,id,s).then(reslt=>{
                        debugger;
                        if(reslt==true){
                          debugger;
                          var phoneNo = response[i].phoneNo;
                          this.signupservices.GetCaptainMethod("api/Captain/","GetCaptain",{'phoneNo':phoneNo}).subscribe(response1=>{
                          if(response1!=null){
                            debugger;
                            //let check = this.GetUserHabits(GlobalService.PhoneNo,response1[2]);
                            this.GetUserHabits(GlobalService.PhoneNo,response1[2]).then(ret => {
                              if(ret==true){
                                debugger;
                                this.driversdetails.push(response1[0]);
                                this.vehicledetails.push(response1[1]);
                                this.seatsArray.push(this.available_seats);
                                let t = this.extime;
                                this.exp_time.push(t);
                                this.routedetails.push(response[i].stime);
                                this.bookings.push({
                                  o_id:id,
                                  p1:P1,
                                  p2:P2,
                                  bookseats:s,
                                });
                                debugger;
                              }
                            })
                          }
                        });
                        }
                      })
                      break;
                    }

                  }
                  break;
                }
              }
            }
          }
          debugger;
            this.ShowHideButton();
        }
        else{
          alert("Error");
        }
      });
        }

      }

    }
    Book(x,y,b){
      debugger;
      let id = b.o_id;
      let P1 = b.p1;
      let P2 = b.p2;
      let seats = b.bookseats;
      var d_phone = x.phoneNo;
      var vehicle_ID = y.vehicle_ID;
      var u_phone = GlobalService.PhoneNo;
      this.signupservices.PostMethod("api/Captain/","UpdateSeats",{id,P1,P2,seats}).subscribe(response1=>{
        if(response1!=null){
          alert("Your Seats Reserved");
          debugger;
          this.signupservices.BookingMethod("api/Captain/","Booking",{d_phone,u_phone,vehicle_ID,seats,'order_id':id}).subscribe(response=>{
            if(response==true){
              alert("Booked");
            }
          });
        }
      });
    }
    GetUserHabits(phone,list){
      var phoneNo = phone;
      return new Promise(resolve=>{ this.signupservices.Searching("api/Captain/","GetHabits",{phoneNo}).subscribe(responce =>{
        if(responce[0]!=null){
          debugger;
          let x = responce[0];
          if(x.smooking == list.allowsmooking && x.music == list.allowmusic && x.talkative == list.allowtalkative &&
             x.allowsmooking == list.smooking && list.music == x.allowmusic && list.talkative == x.allowtalkative){
            resolve(true);
          }
          else{
            resolve(false);
          }
        }
        else{
          resolve(false);
        }
      })
    })
  }
  CHeckSeats(p1,p2,ID,s){
    debugger;
    let Offer_ID = ID;

    return new Promise(resolve=>{
      this.signupservices.Searching("api/Captain/","GetSeats",{Offer_ID}).subscribe(res =>{
      debugger;
        if(res[0]!=null){
          debugger;
          for(let i=p1+1;i<=p2;i++){
            if(res[i].seats_offer>=s ){
              resolve(true);
              if(this.available_seats>res[i].seats_offer){
                debugger;
                this.extime = new Date(res[i].ex_time).toLocaleString('en-US', { hour: 'numeric',minute:'numeric', hour12: false });
                this.available_seats = res[i].seats_offer;
              }
            }
            else{
              resolve(false);
              break;
            }
          }
        }
        else{
          resolve(false);
        }
      })
    })
  }

  markers: marker[] = [];
}

 interface marker {
	lat: number;
	lng: number;
  iconUrl:string | google.maps.Icon | google.maps.Symbol;
  label?: any;
	draggable: boolean;
}
interface Booking{
  o_id:number;
  p1:number;
  p2:number;
  bookseats:number;
}
