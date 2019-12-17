import { Component, OnInit } from "@angular/core";
import { LoginService } from "src/app/login.service";

@Component({
  selector: "app-examiner-dashboard",
  templateUrl: "./examiner-dashboard.component.html",
  styleUrls: ["./examiner-dashboard.component.css"]
})
export class ExaminerDashboardComponent implements OnInit {
  constructor(private login: LoginService) {}
  logOut() {
    this.login.logout();
  }

  ngOnInit() {}
}
