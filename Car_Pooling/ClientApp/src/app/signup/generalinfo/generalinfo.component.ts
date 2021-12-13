import { ChangeDetectorRef, Component, OnInit, Output, EventEmitter } from '@angular/core';
import{GlobalService} from '../../global.service';
import { Global } from '../signup_global';
import { SignUpService } from 'src/app/general.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-generalinfo',
  templateUrl: './generalinfo.component.html',
  styleUrls: ['./generalinfo.component.css']
})
export class GeneralinfoComponent implements OnInit {

  generalForm: FormGroup;
  submitted = false;
  constructor( private cd: ChangeDetectorRef, private signupservices : SignUpService, private route:Router,private formBuilder: FormBuilder) { }

  ngOnInit() {
      GlobalService.role = "Driver";
      this.generalForm = this.formBuilder.group({
      role:GlobalService.role,
      firstName: ['', [Validators.required,Validators.pattern('^[a-zA-Z ]*$')]],
      lastName: ['', [Validators.required,Validators.pattern('^[a-zA-Z ]*$')]],
      // validates date format yyyy-mm-dd
      cnic: ['',[Validators.required,Validators.minLength(13)]],
      email: ['', [Validators.required, Validators.email]],
      city: ['',[ Validators.required,Validators.pattern('^[a-zA-Z ]*$')]],
      phoneNo: ['',[Validators.required,Validators.minLength(11)]],
      gender:['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
  });
  }

  get f() { return this.generalForm.controls; }

  onSubmit() {
    this.submitted = true;
    var role = GlobalService.role;
    // stop here if form is invalid
    if (this.generalForm.invalid) {
        return;
    }
    Global.personaldata = this.generalForm.value;
    // display form values on success
    alert(JSON.stringify(Global.personaldata));
    if(GlobalService.role=='passenger'){
      this.route.navigate(['/login']);
    }
    else
    this.route.navigate(['/vehicle']);
  }


  editFile: boolean = true;
  removeUpload: boolean = false;
  imageUrl: any;
  FileUpload : File;
  uploadFile(event) {
    let reader = new FileReader(); // HTML5 FileReader API
    this.FileUpload = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(this.FileUpload);
      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.editFile = false;
        this.removeUpload = true;
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }


   SignUp(){
    debugger;


    debugger;
    this.route.navigate(['/vehicle']);
    //  if(firstname == undefined || lastname ==undefined || email==undefined|| cnic ==undefined|| city== undefined || phone ==undefined || password==undefined|| cpassword ==undefined){
    //   alert("fill all fields");
    // }else{

    //    this.signupservices.SignUpMethod("api/Captain/","General", {firstname,lastname,email,cnic,phone,city,password,cpassword,image,role}).subscribe(response => {
    //     if(response == true){
    //       alert("Data Saved Successfully");
    //     }
    //     else{
    //       alert("Api Error")
    //     }
    //   });
    // }
  }

}

