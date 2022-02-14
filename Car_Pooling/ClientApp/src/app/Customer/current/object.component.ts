import { NgZone, Component, OnInit, AfterViewInit } from '@angular/core';
import { SignUpService } from 'src/app/general.service';
import { GlobalService } from 'src/app/global.service';
import { MouseEvent } from "@agm/core";

@Component({
  selector: 'app-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.css']
})
export class ObjectComponent implements OnInit, AfterViewInit {

  constructor(private service : SignUpService) {
  }
  srclatitude: number;
  srclongitude:number;
  deslatitude: number;
  deslongitude:number;
  lati ;
  longi ;
  latitude: number ;
  longitude: number ;
  markers
  iconUrl
  url;
  url1;
  ngOnInit() {
    let phoneNo = GlobalService.PhoneNo;
    let date = new Date();
    this.setCurrentLocation();
    this.service.GetPointsMethod("api/Home/","CurrentLocation",{phoneNo,date}).subscribe(response => {
      if(response.length>0){
        debugger;

        this.markers = eval(response[0]);

        this.MoveCar(this.markers);
        this.srclatitude = response[1].split(',')[0];
        this.srclongitude = response[1].split(',')[1];
        this.deslatitude = response[2].split(',')[0];
        this.deslongitude = response[2].split(',')[1];
      }
      else{
        alert("Your Current Ride not start")
      }
    });

    // this.markers = [
    //   { "lat": 33.62719851659249, "lng": 73.11504364013672 },
    //   { "lat": 33.63691756839491, "lng": 73.1081771850586 },
    //   { "lat": 33.64685903909918, "lng": 73.10163843182161 },
    //   { "lat": 33.657718956680824, "lng": 73.09374200848177 },
    //   { "lat": 33.66514863701472, "lng": 73.08618890789583 }
    // ]
    this.url= "http://maps.google.com/mapfiles/ms/icons/";
        this.url += 'green' + "-dot.png";
    this.url1 = "http://maps.google.com/mapfiles/ms/icons/";
        this.url1 += 'red' + "-dot.png";
    this.iconUrl = "https://img.icons8.com/external-those-icons-lineal-color-those-icons/48/000000/external-car-cars-components-those-icons-lineal-color-those-icons.png"
    // this.iconUrl = this.iconUrl  + "-dot.png";
    // this.MoveCar(this.markers);
    // debugger;
    // this.latitude = 33.66514863701472;
    // this.longitude =73.08618890789583;
  }
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lati = position.coords.latitude;
        this.longi = position.coords.longitude;
      });
    }
  }
  ngAfterViewInit(): void {
    // debugger;
    // this.latitude = 33.66514863701472;
    // this.longitude = 73.08618890789583;
  }
  state = 0;
  checkKM(lat,lng){
    let d = this.getDistanceFromLatLonInKm(lat,lng,this.srclatitude,this.srclongitude);
    debugger;
    if(d<0.8 && this.state==0){
      alert("Owner near about your Destination. Be aready...");
      this.state=1;
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
  async MoveCar(Markers) {
    this.latitude = Markers[0].lat;
      this.longitude = Markers[0].lng;
    debugger;
    for (let i = 1; i < Markers.length; i++) {

      let delayres = await this.delay(5000);
      debugger;
      // this.checkKM(Markers[i].lat,Markers[i].lng);
      this.latitude = Markers[i].lat;
      this.longitude = Markers[i].lng;
    }
  }
  async delay(delayInms) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(2);
      }, delayInms);
    });
  }

}


