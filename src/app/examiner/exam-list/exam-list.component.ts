import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-exam-list",
  templateUrl: "./exam-list.component.html",
  styleUrls: ["./exam-list.component.css"]
})
export class ExamListComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  public allBatch = [];

  public allExam = [];
  public currentExam = {};
  fetchExam() {
    const examiner = localStorage.getItem("username");
    this.http.get(`examiner/getExaminer/${examiner}`).subscribe(res => {
      // Get Batch
      this.allBatch = res["batch"];
      // Get Exam
      this.allExam = res["exam"];
    });
  }

  ngOnInit() {
    this.fetchExam();
  }

  openExam(examname) {
    this.router.navigate(["../open-exam", examname], {
      relativeTo: this.route
    });
  }
  // Adding Exam
  addExam(obj) {
    let batch = [];
    let batchObj = obj.batch;
    for (let property in batchObj) {
      if (batchObj[property] === true) {
        batch.push(property);
      }
    }

    obj.batch = batch;
    // Add Exam
    let examiner = localStorage.getItem("username");
    this.http.put(`examiner/addExam/${examiner}`, obj).subscribe(res => {
      if (res["message"] == "New Exam Created Successfully") {
        this.fetchExam();
      } else {
        alert(res["message"]);
      }
    });
  }

  deleteExam(examname) {
    const examiner = localStorage.getItem("username");

    let student = {
      examname: examname,
      examinerId: examiner
    };
    this.http.put(`examiner/removeExam`, student).subscribe(res => {
      if (res["message"] == "Exam Removed") {
        this.fetchExam();
      }
    });
  }

  editExam(examname) {
    this.allExam.forEach(examObj => {
      if (examObj.examname === examname) {
        this.currentExam = examObj;
      }
    });
  }

  updateExam(valueObj, examname) {
    let batch = [];
    let batchObj = valueObj.batch;
    for (let property in batchObj) {
      if (batchObj[property] === true) {
        batch.push(property);
      }
    }

    valueObj.batch = batch;
    valueObj.examname = examname;

    let examiner = localStorage.getItem("username");
    this.http
      .put(`examiner/updateExam/${examiner}`, valueObj)
      .subscribe(res => {
        if (res["message"] == "Exam Updated Successfully") {
          this.fetchExam();
        }
      });
  }

  publishExam(examname) {
    const examiner = localStorage.getItem("username");

    let student = {
      examname: examname,
      examinerId: examiner
    };

    this.http.put(`examiner/publishExam`, student).subscribe(res => {
      if (res["message"] == "Exam Published... Go to Performance") {
        alert(res["message"]);
        this.fetchExam();
      }
    });
  }
}
