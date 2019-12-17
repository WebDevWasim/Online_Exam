import { LoginService } from "./../../login.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-student-login",
  templateUrl: "./student-login.component.html",
  styleUrls: ["./student-login.component.css"]
})
export class StudentLoginComponent implements OnInit {
  constructor(private router: Router, private login: LoginService) {}

  onLogin(form) {
    let loginData = form.value;
    this.login.studentLogin(loginData).subscribe(res => {
      if (res["message"] === "Logged in successfully") {
        // alert("Student " + res["message"]);
        this.router.navigate(["student/dashbord", res["username"]]);
        localStorage.setItem("token", res["token"]);
        localStorage.setItem("username", res["username"]);
      } else {
        alert(res["message"]);
      }
    });
  }

  signUp() {
    this.router.navigate(["student/register"]);
  }

  ngOnInit() {}
}
