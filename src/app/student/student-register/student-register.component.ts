import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
declare var jQuery: any;
@Component({
  selector: "app-student-register",
  templateUrl: "./student-register.component.html",
  styleUrls: ["./student-register.component.css"]
})
export class StudentRegisterComponent implements OnInit {
  constructor(private router: Router, private hc: HttpClient) {}

  @ViewChild("myModal", { static: false }) myModal: ElementRef<HTMLElement>;
  public isRegistered: boolean = false;
  public isNotRegistered: boolean = false;
  public loading = false;
  public message = "";

  LogIn() {
    this.router.navigate(["student/login"]);
  }

  submitForm(formRef) {
    const userObj = formRef.value;
    delete userObj.cnfPassword;
    this.loading = true;
    this.hc.post("student/register", userObj).subscribe(res => {
      this.loading = false;
      if (res["message"] === "registered succesfully") {
        this.isNotRegistered = true;
        this.message = `${userObj.name} registered successfully`;
        formRef.reset();
        jQuery(this.myModal.nativeElement).modal("show");
      } else {
        this.isRegistered = true;
        this.message = `Username ${userObj.username} is already taken`;
        setTimeout(() => {
          this.isRegistered = false;
        }, 3000);
      }
    });
  }

  ngOnInit() {}
}
