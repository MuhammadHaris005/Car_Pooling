import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SignUpService } from "src/app/general.service";
import { GlobalService } from "src/app/global.service";
import { Global } from "../signup_global";

@Component({
  selector: "app-attributes",
  templateUrl: "./attributes.component.html",
  styleUrls: ["./attributes.component.css"],
})
export class AttributesComponent implements OnInit {
  HabitsForm: FormGroup;
  submitted = false;
  button:boolean=true;
  constructor(
    private rout: Router,
    private formBuilder: FormBuilder,
    private postservices: SignUpService
  ) {}

  ngOnInit() {
    this.HabitsForm = this.formBuilder.group({
      smooking: [Validators.required],
      talkative: [Validators.required],
      music: [Validators.required],
      allowsmooking: [Validators.required],
      allowtalkative: [Validators.required],
      allowmusic: [Validators.required],
      phoneNo: Global.personaldata.phoneNo,
    });
    if(GlobalService.role=="passenger"){
      this.button = false;
    }
  }
  get f() {
    return this.HabitsForm.controls;
  }

  onSubmit() {
    debugger;
    this.submitted = true;

    // stop here if form is invalid
    if (this.HabitsForm.invalid) {
      return;
    }
    Global.habits = this.HabitsForm.value;
    // display form values on success
    alert(JSON.stringify(Global.habits));
    if (GlobalService.role == "passenger") {
      this.Register();
    }
    else this.rout.navigate(["/routemap"]);
  }

  Register() {
    this.postservices
      .PostMethod("api/Captain/", "General", Global.personaldata)
      .subscribe((response) => {
        if (response == true) {
          this.postservices
            .PostMethod("api/Captain/", "Habits", Global.habits)
            .subscribe((response) => {
              if (response == true) {
                alert("Registration Successfully....")
              } else {
                alert("Api Error");
              }
            });
        } else {
          alert("Api Error");
        }
      });
      this.rout.navigate(["/login"]);
  }
}
