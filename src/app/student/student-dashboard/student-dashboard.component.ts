import { Component, OnInit } from "@angular/core";
import { LoginService } from "src/app/login.service";

@Component({
  selector: "app-student-dashboard",
  templateUrl: "./student-dashboard.component.html",
  styleUrls: ["./student-dashboard.component.css"]
})
export class StudentDashboardComponent implements OnInit {
  constructor(private login: LoginService) {}
  logOut() {
    this.login.logout();
  }

  ngOnInit() {}
}
