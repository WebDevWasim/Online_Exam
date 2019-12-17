import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-enter-batch",
  templateUrl: "./enter-batch.component.html",
  styleUrls: ["./enter-batch.component.css"]
})
export class EnterBatchComponent implements OnInit {
  public batchId;
  public allExams = [];
  public allPerformance = [];
  public currentExam = {};
  constructor(
    private activeRoute: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}
  ngOnInit() {
    this.activeRoute.params.subscribe(res => {
      this.batchId = res["batchId"];
      let studentId = localStorage.getItem("username");
      this.http
        .get(`student/getBatchExam/${this.batchId}/${studentId}`)
        .subscribe(res => {
          this.allExams = res["exam"];
          this.allPerformance = res["performance"];
          console.log("exam", this.allExams);
          console.log(this.batchId);
          console.log("performance", this.allPerformance);

          if (this.allExams.length > 0 && this.allPerformance.length > 0) {
            for (let examIndex in this.allExams) {
              for (let performanceIndex in this.allPerformance) {
                if (
                  this.allExams[examIndex]["examname"] ===
                    this.allPerformance[performanceIndex]["examname"] &&
                  this.batchId ===
                    this.allPerformance[performanceIndex]["batchId"]
                ) {
                  console.log(`[${examIndex},${performanceIndex}]`);

                  this.allExams.splice(+examIndex, 1);
                  console.log(this.allExams);
                }
              }
            }
          }
        });
    });
  }

  startExam(examname) {
    this.allExams.forEach(examObj => {
      if (examObj.examname === examname) {
        this.currentExam = examObj;
      }
    });
  }

  beginExam(examname) {
    this.router.navigate(["../../begin-exam", this.batchId, examname], {
      relativeTo: this.activeRoute
    });
  }
}
