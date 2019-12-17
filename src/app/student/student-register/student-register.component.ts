import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-student-register",
  templateUrl: "./student-register.component.html",
  styleUrls: ["./student-register.component.css"]
})
export class StudentRegisterComponent implements OnInit {
  constructor(private router: Router, private hc: HttpClient) {}

  LogIn() {
    this.router.navigate(["student/login"]);
  }

  submitForm(formRef) {
    const userObj = formRef.value;
    delete userObj.cnfPassword;

    this.hc.post("student/register", userObj).subscribe(res => {
      alert(res["message"]);
    });
  }

  ngOnInit() {}
}
