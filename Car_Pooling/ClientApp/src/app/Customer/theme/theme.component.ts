import { Component } from '@angular/core';
import { SignUpService } from '../../general.service';
import{MouseEvent} from '@agm/core'
import { GlobalService } from '../../global.service';
import { Router } from '@angular/router';
 @Component({
    selector: 'app-theme',
    templateUrl:'./theme.component.html',
    styleUrls: ['./theme.component.css']
 })
  export class ThemeComponent {
    seats=1;

    Srclatitude  = 33.7088043921253;
    Srclongitude = 73.0655460752356;
    Deslatitude  = 33.71799084268011;
    Deslongitude =  73.099967760310;
    time :any;
    driversdetails =[];
    vehicledetails=[];
    routedetails=[];

    showMainContent: Boolean = true;

    Cancel(){
      this.driversdetails=[];
      this.vehicledetails=[];
      this.ShowHideButton();
    }

    ShowHideButton() {
      this.showMainContent = this.showMainContent ? false : true;
    }
    constructor(private signupservices: SignUpService) {

    }

    ngOnInit() {
      this.time = new Date();
       this.time = this.time.toLocaleString('en-US', { hour: 'numeric',minute:'numeric', hour12: false });
       alert(this.time);

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
    SrcDragEnd(event: MouseEvent){
      this.Srclatitude = event.coords.lat;
      this.Srclongitude = event.coords.lng;
      }
    DesDragEnd(event: MouseEvent){
        this.Deslatitude = event.coords.lat;
        this.Deslongitude = event.coords.lng;
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
      this.signupservices.GetRides("api/Captain/","GetRides").subscribe(response => {
        if(response!= null){
          debugger
          //alert(JSON.stringify(response));
          for (let i = 0; i < response.length; i++) {
            debugger;
            if(response[i].status=='active' && response[i].stime > this.time){
              let a  =eval(response[i].mappoints) ;
              for (let j = 0; j < a.length; j++) {
                var d = this.getDistanceFromLatLonInKm(a[j].lat,a[j].lng,this.Srclatitude,this.Srclongitude);
                if(d<1){
                  for (let x = j; x < a.length; x++) {
                    var z = this.getDistanceFromLatLonInKm(a[x].lat,a[x].lng,this.Deslatitude,this.Deslongitude);
                    if(z<1){
                      debugger
                      var phoneNo = response[i].phoneNo;
                      this.signupservices.GetCaptainMethod("api/Captain/","GetCaptain",{'phoneNo':phoneNo}).subscribe(response1=>{
                        if(response1!=null){
                          //alert(JSON.stringify(response[0]));
                          this.driversdetails.push(response1[0]);
                          this.vehicledetails.push(response1[1]);
                          this.routedetails.push(response[i].stime)
                          //alert(JSON.stringify(this.drivers))
                          /* let s = eval(this.drivers[0]);
                          alert(s[0].firstname); */
                        }
                      });
                    }
                  }
                }
              }
            }
          }
          debugger
          this.ShowHideButton();
        }
        else{
          alert("Error");
        }
      });
    }
    Book(x,y){

      var phone = x.phone;
      var seat =y.vseats-this.seats;
      var name = x.firstname +" "+ x.lastname;
      var time = this.time;
      var seats = this.seats;
      var u_phone = GlobalService.PhoneNo;
      this.signupservices.PostMethod("api/Captain/","UpdateSeats",{'phone':phone,'vseats':seat}).subscribe(response1=>{
        if(response1!=null){
          alert("Your Seats Reserved");
          debugger;
          this.signupservices.BookingMethod("api/Captain/","Booking",{name,time,seats,u_phone}).subscribe(response=>{
            if(response==true){
              alert("Booked");
            }
          });
        }
      });



    }
 }

