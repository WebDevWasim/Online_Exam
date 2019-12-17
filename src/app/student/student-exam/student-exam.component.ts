import { Router, ActivatedRoute } from "@angular/router";
import { LoggedUserService } from "./../../logged-user.service";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-student-exam",
  templateUrl: "./student-exam.component.html",
  styleUrls: ["./student-exam.component.css"]
})
export class StudentExamComponent implements OnInit {
  private studentId = localStorage.getItem("username");

  public examinerList = [];

  constructor(
    private http: HttpClient,
    private loggedUser: LoggedUserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.http
      .get(`student/getExaminerList/${this.studentId}`)
      .subscribe(res => {
        this.examinerList = res["message"]["examinerList"];
      });
  }

  openExaminerBatch(examinerId) {
    this.router.navigate(["examiner-batch", examinerId], {
      relativeTo: this.route
    });
  }
}
