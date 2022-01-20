import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpService } from '../../general.service';
import { GlobalService } from '../../global.service';
import { Global } from '../../signup/signup_global';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  generalForm: FormGroup;
  vehicleForm: FormGroup;
  HabitsForm: FormGroup;
  submitted = false;
  constructor( private cd: ChangeDetectorRef, private postservices : SignUpService, private route:Router,private formBuilder: FormBuilder) { }

  ngOnInit() {
    debugger;
    this.generalForm = this.formBuilder.group({
      role:GlobalService.role,
      firstName: ['', [Validators.required,Validators.pattern('^[a-zA-Z ]*$')]] ,
      lastName: ['', [Validators.required,Validators.pattern('^[a-zA-Z ]*$')]],
      // validates date format yyyy-mm-dd
      cnic: ['',[Validators.required,Validators.minLength(13)]],
      email: ['', [Validators.required, Validators.email]],
      city: ['',[ Validators.required,Validators.pattern('^[a-zA-Z ]*$')]],
      phoneNo: ['',[Validators.required,Validators.minLength(3)]],
      gender:['', Validators.required],
      image: [''],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
    this.vehicleForm = this.formBuilder.group({
      regno: ['', [Validators.required]],
      model: ['', [Validators.required]],
      maker: ['', [Validators.required]],
      seats: ['', [Validators.required]],
      color: ['', [Validators.required]]
    });
    debugger;
    this.HabitsForm = this.formBuilder.group({
      smooking: ['', [Validators.required]],
      talkative: ['', [Validators.required]],
      music: ['', [Validators.required]],
      allowsmooking: ['', [Validators.required]],
      allowtalkative: ['', [Validators.required]],
      allowmusic: ['', [Validators.required]],
    });
    this.getPerson(GlobalService.PhoneNo);
  }
  get f() { return this.generalForm.controls; }
  get g() { return this.vehicleForm.controls; }
  get h() { return this.HabitsForm.controls; }
  getPerson(phoneNo){
    debugger;
    this.postservices.GetCaptainMethod("api/Captain/","GetCaptain",{phoneNo}).subscribe(responce =>{
      if(responce){
        this.generalForm.controls['firstName'].setValue(responce[0].firstname);
        this.generalForm.controls['lastName'].setValue(responce[0].lastname);
        this.generalForm.controls['cnic'].setValue(responce[0].cnic);
        this.generalForm.controls['email'].setValue(responce[0].email);
        this.generalForm.controls['city'].setValue(responce[0].city);
        this.generalForm.controls['gender'].setValue(responce[0].gender);
        this.generalForm.controls['password'].setValue(responce[0].password)

        this.vehicleForm.controls['regno'].setValue(responce[1].regno);
        this.vehicleForm.controls['model'].setValue(responce[1].model);
        this.vehicleForm.controls['maker'].setValue(responce[1].maker);
        this.vehicleForm.controls['color'].setValue(responce[1].color);
        this.vehicleForm.controls['seats'].setValue(responce[1].seats);
        debugger;
        this.HabitsForm.controls['music'].setValue(responce[2].music);
        this.HabitsForm.controls['smooking'].setValue(responce[2].smooking);
        this.HabitsForm.controls['talkative'].setValue(responce[2].talkative);
        this.HabitsForm.controls['allowmusic'].setValue(responce[2].allowmusic);
        this.HabitsForm.controls['allowsmooking'].setValue(responce[2].allowsmooking);
        this.HabitsForm.controls['allowtalkative'].setValue(responce[2].allowtalkative);
        this.imageUrl=responce[0].image
        this.generalForm.controls['image'].setValue(this.imageUrl);
      }
    });
  }


  onSubmit(generalForm,vehicleForm,HabitsForm) {
    debugger;
    this.submitted = true;
    var role = GlobalService.role;

    // stop here if form is invalid
    let Personal = generalForm.value;
    Personal.image = this.imageUrl;
    let Vehicle = vehicleForm.value;
    let Habits = HabitsForm.value;
    this.postservices.PostMethod("api/Home/","UpdateProfile", {Personal,Vehicle,Habits}).subscribe(response => {
    });
    debugger;
    // display form values on success


  }


  editFile: boolean = true;
  removeUpload: boolean = false;
  imageUrl: any;
  FileUpload : File;
  uploadFile(event) {
    debugger;
    let reader = new FileReader(); // HTML5 FileReader API
    this.FileUpload = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(this.FileUpload);
      // When file uploads set it to file formcontrol
      reader.onload = () => {
        debugger;
        this.imageUrl = reader.result;
        this.generalForm.controls['image'].setValue(reader.result);
        this.editFile = false;
        this.removeUpload = true;
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();

    }
  }

}
