import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';
import { SignUpService } from '../general.service';
import { Global } from '../signup/signup_global';
declare const $:any;
 @Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  constructor( private signupservices : SignUpService,private router: Router,private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      phone:["", [Validators.required]],
      password:["", [Validators.required]]
    });
  }
  ngOnInit() {
   // $('#loader').remove();
  }
  get f() {
    return this.loginForm.controls;
  }
  onSubmit() {
    debugger;
    this.submitted = true;
    if (this.loginForm.invalid) {
            return;
        }
    var phone = this.loginForm.value.phone;
    var password = this.loginForm.value.password;
    if(this.loginForm.valid) {
      this.signupservices.PostMethod("api/Captain/","Login",{phone,password}).subscribe(response => {
        debugger;
        if(response==undefined){
          alert("Incorrect Phone No or Password...")
        }
        else{
         // Swal.fire("Good job!", "Login Successfully!", "success");
          GlobalService.PhoneNo=phone;
          GlobalService.role = response[0].role;
          if(response[0].role=="passenger"){
            this.router.navigate(['/theme']);
          }
          else{
            this.router.navigate(['/captain']);
          }
        }
      });
    }
  }

}
