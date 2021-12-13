import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit() {
  }
   btndrive(){
    GlobalService.role = "driver";
    debugger;
    this.route.navigate(['/signup']);
   }
   btnridee(){
    GlobalService.role = "passenger";
    debugger;
    this.route.navigate(['/signup']);
   }

}
