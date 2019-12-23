import { LoginService } from "./../../login.service";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
declare var jQuery: any;

@Component({
  selector: "app-student-login",
  templateUrl: "./student-login.component.html",
  styleUrls: ["./student-login.component.css"]
})
export class StudentLoginComponent implements OnInit {
  constructor(private router: Router, private login: LoginService) {}

  @ViewChild("myModal", { static: false }) myModal: ElementRef<HTMLElement>;

  public loading = false;
  public message = "";

  onLogin(form) {
    let loginData = form.value;
    this.loading = true;
    this.login.studentLogin(loginData).subscribe(res => {
      this.loading = false;
      if (res["message"] === "Logged in successfully") {
        // alert("Student " + res["message"]);
        this.router.navigate(["student/dashbord", res["username"]]);
        localStorage.setItem("token", res["token"]);
        localStorage.setItem("username", res["username"]);
      } else {
        this.message = res["message"];
        jQuery(this.myModal.nativeElement).modal("show");
      }
    });
  }

  signUp() {
    this.router.navigate(["student/register"]);
  }

  ngOnInit() {}
}
