import { LoggedUserService } from "./../../logged-user.service";
import { HttpClient } from "@angular/common/http";
import { VerifyStudentService } from "./../../verify-student.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-verify-student",
  templateUrl: "./verify-student.component.html",
  styleUrls: ["./verify-student.component.css"]
})
export class VerifyStudentComponent implements OnInit {
  constructor(
    private loggedUser: LoggedUserService,
    private http: HttpClient
  ) {}

  // private examiner = this.loggedUser.loggedUserName();
  private examiner = localStorage.getItem("username");
  public searchItem: any;
  public searchField: any = "batchId";
  private studentsData = [];

  loadRequestList() {
    this.http.get(`examiner/getRequests/${this.examiner}`).subscribe(res => {
      if (res["message"].length > 0) {
        this.studentsData = [];
        res["message"].forEach(requestObj => {
          this.http
            .get(`examiner/getStudentsDetails/${requestObj["studentId"]}`)
            .subscribe(res1 => {
              res1["message"].batchId = requestObj["batchId"];
              this.studentsData.push(res1["message"]);
            });
        });
      } else {
        this.studentsData = res["message"];
      }
    });
  }
  ngOnInit() {
    this.loadRequestList();
  }

  rejectStudent(studentId, batchId) {
    let dataObj = {
      studentId: studentId,
      batchId: batchId
    };
    this.http
      .put(`examiner/rejectRequest/${this.examiner}`, dataObj)
      .subscribe(res => {
        if (res["message"] == "Request Rejected") {
          this.loadRequestList();
        }
      });
  }

  approveStudent(studentId, batchId) {
    let dataObj = {
      studentId: studentId,
      batchId: batchId
    };
    this.http
      .put(`examiner/approveRequest/${this.examiner}`, dataObj)
      .subscribe(res => {
        if (res["message"] == "Student added to the batch") {
          this.loadRequestList();
        }
      });
  }
}
