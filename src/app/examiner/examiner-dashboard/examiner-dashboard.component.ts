import { Component, OnInit } from "@angular/core";
import { LoginService } from "src/app/login.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-examiner-dashboard",
  templateUrl: "./examiner-dashboard.component.html",
  styleUrls: ["./examiner-dashboard.component.css"]
})
export class ExaminerDashboardComponent implements OnInit {
  constructor(private login: LoginService, private http: HttpClient) {}
  public examinerObj: object = {};
  logOut() {
    this.login.logout();
  }

  ngOnInit() {
    let examinerId = localStorage.getItem("username");
    this.http
      .get(`examiner/getExaminerDetails/${examinerId}`)
      .subscribe(res => {
        this.examinerObj = res["message"];
      });
  }
}
