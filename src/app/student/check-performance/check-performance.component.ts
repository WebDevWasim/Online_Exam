import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-check-performance",
  templateUrl: "./check-performance.component.html",
  styleUrls: ["./check-performance.component.css"]
})
export class CheckPerformanceComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private router: Router,
    private currenRoute: ActivatedRoute
  ) {}

  public performance = {};
  public answers = [];
  public wrongAns = 0;
  public attemptQuestion = 0;
  public totalScore = 0;

  public right: boolean = false;
  public wrong: boolean = false;
  public notAttempted: boolean = false;

  public examname;
  public batchId;
  ngOnInit() {
    this.currenRoute.params.subscribe(params => {
      this.examname = params["examname"];
      this.batchId = params["batchId"];
      let studentId = localStorage.getItem("username");
      this.http.get(`student/getPerformance/${studentId}`).subscribe(res => {
        res["performance"].filter(resultObj => {
          if (
            this.examname == resultObj["examname"] &&
            this.batchId == resultObj["batchId"]
          ) {
            this.performance = resultObj;

            // ========================= Logic for Answer Check ====================== //
            this.answers = this.performance["answers"];
            console.log(this.answers);
            this.answers.forEach(ansObj => {
              if (ansObj["giverAns"] !== "") {
                this.attemptQuestion++;
                if (ansObj["giverAns"] === ansObj["ans"]) {
                  this.totalScore++;
                  this.right = true;
                } else {
                  this.wrongAns++;
                  this.wrong = true;
                }
              }
            });
          }
        });
      });
    });
  }
}
