import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpService } from 'src/app/general.service';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-c_profile',
  templateUrl: './c_profile.component.html',
  styleUrls: ['./c_profile.component.css']
})
export class C_profileComponent implements OnInit {

  generalForm: FormGroup;
  HabitsForm: FormGroup;
  submitted = false;
  constructor( private cd: ChangeDetectorRef, private postservices : SignUpService,
     private route:Router,private formBuilder: FormBuilder) { }

  ngOnInit() {
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
  get h() { return this.HabitsForm.controls; }
  getPerson(phone){
    debugger;
    this.postservices.GetCaptainMethod("api/User/","GetProfile",{phone}).subscribe(responce =>{
      if(responce){
        debugger;
        this.generalForm.controls['firstName'].setValue(responce[0].personal.firstname);
        this.generalForm.controls['lastName'].setValue(responce[0].personal.lastname);
        this.generalForm.controls['cnic'].setValue(responce[0].personal.cnic);
        this.generalForm.controls['email'].setValue(responce[0].personal.email);
        this.generalForm.controls['city'].setValue(responce[0].personal.city);
        this.generalForm.controls['gender'].setValue(responce[0].personal.gender);
        this.generalForm.controls['password'].setValue(responce[0].personal.password)

        this.HabitsForm.controls['music'].setValue(responce[0].habits.music);
        this.HabitsForm.controls['smooking'].setValue(responce[0].habits.smooking);
        this.HabitsForm.controls['talkative'].setValue(responce[0].habits.talkative);
        this.HabitsForm.controls['allowmusic'].setValue(responce[0].habits.allowmusic);
        this.HabitsForm.controls['allowsmooking'].setValue(responce[0].habits.allowsmooking);
        this.HabitsForm.controls['allowtalkative'].setValue(responce[0].habits.allowtalkative);
        this.imageUrl=responce[0].personal.image
        this.generalForm.controls['image'].setValue(this.imageUrl);
      }
    });
  }


  onSubmit(generalForm,HabitsForm) {
    debugger;
    this.submitted = true;
    var role = GlobalService.role;

    // stop here if form is invalid
    let Personal = generalForm.value;
    Personal.image = this.imageUrl;
    Personal.phoneNo = GlobalService.PhoneNo;
    let Habits = HabitsForm.value;
    this.postservices.PostMethod("api/Home/","UpdateUserProfile", {Personal,Habits}).subscribe();
    alert("Profile Updated.....");
    this.getPerson(GlobalService.PhoneNo);
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
