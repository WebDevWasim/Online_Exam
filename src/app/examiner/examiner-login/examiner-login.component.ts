import { LoginService } from "./../../login.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-examiner-login",
  templateUrl: "./examiner-login.component.html",
  styleUrls: ["./examiner-login.component.css"]
})
export class ExaminerLoginComponent implements OnInit {
  constructor(private router: Router, private login: LoginService) {}

  onLogin(form) {
    let loginData = form.value;
    this.login.examinerLogin(loginData).subscribe(res => {
      if (res["message"] === "Logged in successfully") {
        // alert("Examiner " + res["message"]);
        this.router.navigate(["examiner/dashbord", res["username"]]);
        localStorage.setItem("token", res["token"]);
        localStorage.setItem("username", res["username"]);
      } else {
        alert(res["message"]);
      }
    });
  }

  signUp() {
    this.router.navigate(["examiner/register"]);
  }

  ngOnInit() {}
}
