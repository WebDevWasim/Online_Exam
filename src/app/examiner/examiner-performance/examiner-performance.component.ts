import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-examiner-performance",
  templateUrl: "./examiner-performance.component.html",
  styleUrls: ["./examiner-performance.component.css"]
})
export class ExaminerPerformanceComponent implements OnInit {
  public performanceArray = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  fetchExam() {
    const examiner = localStorage.getItem("username");
    this.http.get(`examiner/getExaminer/${examiner}`).subscribe(res => {
      this.performanceArray = res["performance"];
    });
  }

  ngOnInit() {
    this.fetchExam();
  }

  deleteExam(examname, batch) {
    const examiner = localStorage.getItem("username");

    let student = {
      examname: examname,
      examinerId: examiner,
      batch: batch
    };
    console.log(student);

    this.http.put(`examiner/removePerformanceExam`, student).subscribe(res => {
      if (res["message"] == "Exam Removed") {
        this.fetchExam();
      }
    });
  }

  checkResult(examname) {
    this.router.navigate(["../check-result", examname], {
      relativeTo: this.route
    });
  }
}
