import { Component } from '@angular/core';
import { SignUpService } from '../../general.service';
import{MouseEvent} from '@agm/core'
import { GlobalService } from '../../global.service';
import { Router } from '@angular/router';
import { ModalComponent } from 'src/app/_modal/modal.component';
import { ModalService } from 'src/app/_modal';

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

    alldays;
    days;
    date;
    e_date;
    end_date;
    book;

    DriverID:any;
    child:boolean=false;
    lat:number;
    lng:number;
    zoom:number= 10;
    center:any;
    time = new Date();
    Message=[];
    seatsArray=[];
    driversdetails =[];
    vehicledetails=[];
    routedetails=[];
    exp_time=[];

    initial;
    perkm;

    bookings: Booking[]=[];
    showDate :boolean= false;
    showDays:boolean=false;
    Date;
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
      this.drivers=[];
      this.ShowHideButton();
    }

    ShowHideButton() {
      this.showMainContent = this.showMainContent ? false : true;
    }
    constructor(private signupservices: SignUpService,private router : Router, private modalService : ModalService) {
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
      this.CheckReview();
      this.getfare();
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
    CheckReview(){
      debugger;
      let u_phone = GlobalService.PhoneNo;
      this.signupservices.Searching("api/Captain/","Review",{u_phone}).subscribe(res=>{
        if(res.length!=0){
          debugger;
          var D_id = res[0];
          var booking_ID = res[1];
          this.Message=[GlobalService.PhoneNo,D_id,booking_ID];
          this.child=true;
        }
      });
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
      this.getfare();
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
              this.signupservices.Searching("api/Captain/","Searching",{type,date}).subscribe( response => {
                if(response){
                  debugger;
                  for (let i = 0; i < response.length; i++) {
                    let a  =eval(response[i].mappoints) ;
                    for (let j = 0; j < a.length; j++) {
                      var d = this.getDistanceFromLatLonInKm(a[j].lat,a[j].lng,this.markers[0].lat,this.markers[0].lng);
                      if(d<=response[i].distance){
                        let P1 = j;
                        for (let x = j; x < a.length; x++) {
                          var z = this.getDistanceFromLatLonInKm(a[x].lat,a[x].lng,this.markers[1].lat,this.markers[1].lng);
                          if(z<=response[i].distance){
                            let P2 = x;
                            let id = response[i].id;
                            var seats =this.seats;
                            let ph = response[i].phoneNo;
                            var t = this.getDistanceFromLatLonInKm(this.markers[0].lat,this.markers[0].lng,this.markers[1].lat,this.markers[1].lng);
                            let o = (t*this.perkm+this.initial).toLocaleString();
                            let f =parseInt(o);
                            this.signupservices.PostMethod("api/Search/","MatchRide",{'P1':P1,'P2':P2,'seats':seats,'id':id,'owner_phoneNo':ph,'user_phoneNo':GlobalService.PhoneNo}).subscribe(response1 => {
                              if(response1){
                                debugger;
                                let t = new Date(response1[2]);
                                var date = response[i].date.split('T');
                                const booldays =response1[4].split(',').map(s => s === 'true');;
                                const temp = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                                const days = booldays.map((d,i)=>d? temp[i]:d).filter(d=>d);
                                this.drivers.push({
                                  driver: response1[0],
                                  vehicle:response1[1],
                                  seats: response1[3],
                                  time: t,
                                  date: date[0],
                                  rank : 5,
                                  end_date: response1[5],
                                  days:days,
                                  fare:f,
                                  Booking: {o_id:id,p1:P1,p2:P2,bookseats:seats}
                                });
                                this.drivers.sort((a, b) => a.rank - b.rank);
                              }
                            });
                            break;
                            /* const reslt = await this.CHeckSeats(P1,P2,id,s)
                              debugger;
                              if(reslt==true){
                                debugger;
                                var phoneNo = response[i].phoneNo;
                                this.signupservices.GetCaptainMethod("api/Captain/","GetCaptain",{'phoneNo':phoneNo}).subscribe(async response1=>{
                                  if(response1!=null){
                                    debugger;
                                    //let check = this.GetUserHabits(GlobalService.PhoneNo,response1[2]);
                                    const ret = await this.GetUserHabits(GlobalService.PhoneNo,response1[2]);
                                      if(ret==true){
                                        debugger;
                                        let a_seats = this.available_seats
                                        //this.seatsArray.push(a_seats);
                                        let t = new Date(this.extime);
                                        //this.exp_time.push(t);
                                        var date = response[i].date.split('T');
                                        //this.routedetails.push(date[0]);
                                        this.drivers.push({
                                          driver: response1[0],
                                          vehicle:response1[1],
                                          seats: a_seats,
                                          time: t,
                                          date: date[0],
                                          rank : response1[3],
                                          Booking: {o_id:id,p1:P1,p2:P2,bookseats:s}
                                        });
                                        this.drivers.sort((a, b) => a.rank - b.rank);
                                        //this.driversdetails.push(response1[0]);
                                        //this.vehicledetails.push(response1[1]);
                                        // this.bookings.push({
                                        //   o_id:id,
                                        //   p1:P1,
                                        //   p2:P2,
                                        //   bookseats:s,
                                        // });
                                      }
                                  }
                                });
                                break;
                              } */
                          }
                        }
                        break;
                      }
                    }
                  }
                  this.ShowHideButton();
                }
                else{
                  alert("Error");
                }
              });
            }
      }
    }
    getfare(){
      this.signupservices.GetRides("api/Home/","GetFare").subscribe(responce=>{
        if(responce){
          debugger;
          this.initial = responce[0].initialfare;
          this.perkm = responce[0].perKm;
        }
      });
    }
    GetUserHabits(phone,list){
      var phoneNo = phone;
      return new Promise(resolve=>{ this.signupservices.Searching("api/Captain/","GetHabits",{phoneNo}).toPromise().then(responce =>{
        if(responce[0]!=null){

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

      let Offer_ID = ID;

      return new Promise(resolve=>{
        this.signupservices.Searching("api/Captain/","GetSeats",{Offer_ID}).subscribe(res =>{

          if(res[0]!=null){

            for(let i=p1+1;i<=p2;i++){
              if(res[i].seats_offer>=s ){
                if(this.available_seats>res[i].seats_offer){

                  this.extime = new Date(res[i].ex_time);
                  this.available_seats = res[i].seats_offer;
                }
                resolve(true);
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
    BookingModal(a){
      debugger;
      this.book = a;
       this.alldays = a.days;
       this.days = a.days;
       if(this.Date<a.date){
        this.date = a.date;
        this.Date = a.date;
       }
       else{
         this.date = new Date().toISOString().slice(0, 10);
         this.Date = new Date().toISOString().slice(0, 10);
       }

       this.e_date =  a.end_date.split('T')[0];
       this.end_date = a.end_date.split('T')[0];
       if(this.type=='Daily'){

         this.openModal('custom-modal-1');
       }
       else{
         this.openModal('custom-modal-2');
       }
    }
     onChange = (name) => {
       debugger;
      if (this.days.includes(name)) {
       this.days= this.days.filter(a => a !== name)
      } else {
        this.days.push(name)
      }
    }
    Book(x){
      debugger;
      let id = x.Booking.o_id;
      let P1 = x.Booking.p1;
      let P2 = x.Booking.p2;
      let book_date = this.Date;
      let till_date = this.end_date;
      let book_days = this.days.toString();
      if(this.type=='Once'){
        till_date = book_date;
        book_days = "";
      }
      let exp_time = x.time;
      let seats = x.Booking.bookseats;
      var d_phone = x.driver.phoneNo;
      var vehicle_ID = x.vehicle.vehicle_ID;
      var u_phone = GlobalService.PhoneNo;
      var status = 0;
      this.signupservices.PostMethod("api/Captain/","UpdateSeats",{id,P1,P2,seats}).subscribe(response1=>{
        if(response1!=null){
          alert("Your Seats Reserved");

          this.signupservices.BookingMethod("api/Captain/","Booking",{d_phone,u_phone,vehicle_ID,seats,exp_time,'order_id':id,book_date,till_date,book_days,status,'s_point':P1,'e_point':P2}).subscribe(response=>{
            if(response==true){
              alert("Booked");
              let sender = GlobalService.PhoneNo;
              let reciever = d_phone;
              let message = "Book your ride";

              this.signupservices.PostMethod("api/User/","SendNotification",{sender,reciever,message}).subscribe();
              this.closeModal('custom-modal-1');
              this.ShowHideButton();
            }
          });
        }
      });
    }
    openModal(id: string) {
      debugger;
      this.modalService.open(id);
    }

    closeModal(id: string) {
        this.modalService.close(id);
    }
  markers: marker[] = [];
  drivers: AvailableDrivers[] = [];
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
interface AvailableDrivers{
  driver,
  vehicle,
  seats,
  time,
  date,
  end_date,
  days,
  rank,
  fare,
  Booking:Booking
}
