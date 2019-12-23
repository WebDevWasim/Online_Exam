import { Component, OnInit } from "@angular/core";
import { LoginService } from "src/app/login.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-student-dashboard",
  templateUrl: "./student-dashboard.component.html",
  styleUrls: ["./student-dashboard.component.css"]
})
export class StudentDashboardComponent implements OnInit {
  constructor(private login: LoginService, private http: HttpClient) {}
  public studentObj: object = {};
  logOut() {
    this.login.logout();
  }

  ngOnInit() {
    let studentId = localStorage.getItem("username");
    this.http.get(`student/getStudentDetails/${studentId}`).subscribe(res => {
      this.studentObj = res["message"];
    });
  }
}
