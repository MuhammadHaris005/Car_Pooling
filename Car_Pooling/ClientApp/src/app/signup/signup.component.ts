import { ChangeDetectorRef, Component, Output } from '@angular/core';
import { SignUpService } from '../general.service';
import { GlobalService } from '../global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor( private signupservices : SignUpService,private cd: ChangeDetectorRef, private route:Router) { }

  ngOnInit() {
    debugger;
  GlobalService.role = "captain";
  this.route.navigate(['/general']);
  }

}
interface marker {
	lat: number;
	lng: number;
  label?: string;
	draggable: boolean;
}
