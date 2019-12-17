import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-student-performance",
  templateUrl: "./student-performance.component.html",
  styleUrls: ["./student-performance.component.css"]
})
export class StudentPerformanceComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private router: Router,
    private currenRoute: ActivatedRoute
  ) {}
  public performances = [];

  ngOnInit() {
    let studentId = localStorage.getItem("username");
    this.http.get(`student/getPerformance/${studentId}`).subscribe(res => {
      this.performances = res["performance"];
    });
  }
  checkResult(examname, batchId) {
    this.router.navigate(["../performance", batchId, examname], {
      relativeTo: this.currenRoute
    });
  }
}
