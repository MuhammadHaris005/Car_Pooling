import { Component, OnInit } from '@angular/core';
import{MouseEvent} from '@agm/core'
import { SignUpService } from '../../general.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  Srclatitude  = 33.7088043921253;
  Srclongitude = 73.0655460752356;
  Deslatitude  = 33.71799084268011;
  Deslongitude =  73.071967760310;

  constructor(private signupservices: SignUpService) {

   }

  ngOnInit() {
    var d = this.getDistanceFromLatLonInKm(this.Srclatitude,73.05458691101076,33.59948117296982,73.06261193466185);
    console.log(d);
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
        //alert(JSON.stringify(response));
        for (let i = 0; i < response.length; i++) {
          let a  =eval(response[i].mappoints) ;
          for (let j = 0; j < a.length; j++) {
            var d = this.getDistanceFromLatLonInKm(a[j].lat,a[j].lng,this.Srclatitude,this.Srclongitude);
            debugger
            if(d<1){
              for (let x = j; x < a.length; x++) {
                var z = this.getDistanceFromLatLonInKm(a[x].lat,a[x].lng,this.Deslatitude,this.Deslongitude);
                debugger;
                if(z<1){
                  var phone = response[i].phone;
                  this.signupservices.GetCaptainMethod("api/Captain/","GetCaptain",{'phone':phone}).subscribe(response=>{
                    if(response!=null){
                      alert(JSON.stringify(response));
                    }
                  });
                }
              }
            }
          }
        }
      }
      else{
        alert("Error");
      }
    });
  }
}
