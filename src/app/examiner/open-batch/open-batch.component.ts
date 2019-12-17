import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-open-batch",
  templateUrl: "./open-batch.component.html",
  styleUrls: ["./open-batch.component.css"]
})
export class OpenBatchComponent implements OnInit {
  public batchId;
  public studentsData = [];
  constructor(private activeRoute: ActivatedRoute, private http: HttpClient) {}

  // private examiner = this.loggedUser.loggedUserName();
  loadStudentList() {
    this.http.get(`examiner/getStudents/${this.batchId}`).subscribe(res => {
      if (res["message"].length > 0) {
        this.studentsData = [];
        for (let studentId of res["message"]) {
          this.http
            .get(`examiner/getStudentsDetails/${studentId}`)
            .subscribe(res => {
              this.studentsData.push(res["message"]);
            });
        }
      } else {
        this.studentsData = res["message"];
      }
    });
  }

  ngOnInit() {
    // this.batchId = this.activeRoute.snapshot.params.batchId;
    this.activeRoute.params.subscribe(res => {
      this.batchId = res["batchId"];
    });
    this.loadStudentList();
  }
  //TODO: Remove the student from list FIXME: Remove from Students Collection examinerList Array
  removeStudent(studentId) {
    const examiner = localStorage.getItem("username");

    let student = {
      studentId: studentId,
      examinerId: examiner
    };
    this.http
      .put(`examiner/removeStudent/${this.batchId}`, student)
      .subscribe(res => {
        if (res["message"] == "Student removed from the batch") {
          this.loadStudentList();
        }
      });
  }
}
