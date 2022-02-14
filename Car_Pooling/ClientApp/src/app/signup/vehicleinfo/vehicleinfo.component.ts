import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Global } from '../signup_global';
import { SideNavNodeComponent } from 'amexio-ng-extensions';
import { SignUpService } from 'src/app/general.service';
import { GlobalService } from 'src/app/global.service';
@Component({
  selector: 'app-personinfo',
  templateUrl: './vehicleinfo.component.html',
  styleUrls: ['./vehicleinfo.component.css']
})
export class VehicleinfoComponent implements OnInit {

  vehicleForm: FormGroup;
  submitted = false;

  constructor(private postservices:SignUpService, private rout: Router, private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.vehicleForm = this.formBuilder.group({
      regno: ['', Validators.required],
      model: ['', Validators.required],
      maker: ['', Validators.required],
      seats: ['', Validators.required],
      color: ['', Validators.required],
      AC: ['',Validators.required],
      phoneNo: GlobalService.PhoneNo,
  });
  }

  get f() { return this.vehicleForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.vehicleForm.invalid) {
        return;
    }
    Global.vehicledata = this.vehicleForm.value;
    // tslint:disable-next-line:no-debugger
    debugger;
    // display form values on success
    alert(JSON.stringify(Global.vehicledata));
    this.postservices.PostMethod("api/Captain/","Vehicle",Global.vehicledata).subscribe();
    this.rout.navigate(['/routes']);
  }

}
