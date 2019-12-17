import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-examiner-register",
  templateUrl: "./examiner-register.component.html",
  styleUrls: ["./examiner-register.component.css"]
})
export class ExaminerRegisterComponent implements OnInit {
  constructor(private router: Router, private hc: HttpClient) {}

  LogIn() {
    this.router.navigate(["examiner/login"]);
  }

  submitForm(formRef) {
    const userObj = formRef.value;
    delete userObj.cnfPassword;

    this.hc.post("examiner/register", userObj).subscribe(res => {
      alert(res["message"]);
    });
  }
  ngOnInit() {}
}
