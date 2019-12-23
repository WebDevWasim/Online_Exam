import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
declare var jQuery: any;
@Component({
  selector: "app-examiner-register",
  templateUrl: "./examiner-register.component.html",
  styleUrls: ["./examiner-register.component.css"]
})
export class ExaminerRegisterComponent implements OnInit {
  constructor(private router: Router, private hc: HttpClient) {}
  @ViewChild("myModal", { static: false }) myModal: ElementRef<HTMLElement>;
  public isRegistered: boolean = false;
  public isNotRegistered: boolean = false;
  public loading = false;
  public message = "";

  LogIn() {
    this.router.navigate(["examiner/login"]);
  }

  submitForm(formRef) {
    const userObj = formRef.value;
    delete userObj.cnfPassword;
    this.loading = true;
    this.hc.post("examiner/register", userObj).subscribe(res => {
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
