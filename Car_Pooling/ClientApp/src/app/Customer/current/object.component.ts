import { NgZone, Component, OnInit, AfterViewInit } from '@angular/core';
import { SignUpService } from 'src/app/general.service';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.css']
})
export class ObjectComponent implements OnInit, AfterViewInit {

  constructor(private service : SignUpService) {
  }

  lati = 33.62719851659249;
  longi = 73.11504364013672;
  latitude: number ;
  longitude: number ;
  markers
  iconUrl
  ngOnInit() {
    let phoneNo = GlobalService.PhoneNo;
    let date = new Date();
    this.service.GetPointsMethod("api/Home/","CurrentLocation",{phoneNo,date}).subscribe(response => {
      if(response!=null){
        debugger;
        this.markers = response;
        this.MoveCar(this.markers);
      }
    });

    // this.markers = [
    //   { "lat": 33.62719851659249, "lng": 73.11504364013672 },
    //   { "lat": 33.63691756839491, "lng": 73.1081771850586 },
    //   { "lat": 33.64685903909918, "lng": 73.10163843182161 },
    //   { "lat": 33.657718956680824, "lng": 73.09374200848177 },
    //   { "lat": 33.66514863701472, "lng": 73.08618890789583 }
    // ]
    this.iconUrl = "https://img.icons8.com/external-those-icons-lineal-color-those-icons/48/000000/external-car-cars-components-those-icons-lineal-color-those-icons.png"
    // this.iconUrl = this.iconUrl  + "-dot.png";
    // this.MoveCar(this.markers);
    // debugger;
    // this.latitude = 33.66514863701472;
    // this.longitude =73.08618890789583;
  }
  ngAfterViewInit(): void {
    // debugger;
    // this.latitude = 33.66514863701472;
    // this.longitude = 73.08618890789583;
  }
  async MoveCar(Markers) {
    debugger;
    for (let i = 0; i < Markers.length; i++) {
      let delayres = await this.delay(5000);
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


