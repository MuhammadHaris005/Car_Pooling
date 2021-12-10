import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';
import { SignUpService } from '../general.service';
declare const $:any;
 @Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor( private signupservices : SignUpService,private router: Router) {
    this.loginForm = new FormGroup({
      phone: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }
  ngOnInit() {
   // $('#loader').remove();
  }
  onSubmit() {
    debugger;
    var phone = this.loginForm.value.phone;
    var password = this.loginForm.value.password;
    if(this.loginForm.valid) {
      this.signupservices.PostMethod("api/Captain/","Login",{phone,password}).subscribe(response => {
        debugger;
        if(response==undefined){
         // Swal.fire("Oops!", "Invalid Phone No or Passwprd!", "error");
        }
        else{
         // Swal.fire("Good job!", "Login Successfully!", "success");
          GlobalService.PhoneNo=phone;
          if(response[0].role=="user"){
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
