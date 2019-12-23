import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-result-mark",
  templateUrl: "./result-mark.component.html",
  styleUrls: ["./result-mark.component.css"]
})
export class ResultMarkComponent implements OnInit {
  constructor(private activeRoute: ActivatedRoute, private http: HttpClient) {}
  public examname;
  public batches = [];
  public performance = [];
  public answers = [];

  ngOnInit() {
    let examiner = localStorage.getItem("username");

    this.examname = this.activeRoute.snapshot.parent.paramMap.get("examname");

    this.http
      .get(`examiner/getPerformanceArrayDetails/${examiner}/${this.examname}`)
      .subscribe(res => {
        this.batches = res["batches"];
        this.batches.forEach(batchId => {
          this.http
            .get(`examiner/getBatchResult/${batchId}/${this.examname}`)
            .subscribe(res => {
              this.performance.push(res["message"]);
              this.performance.forEach(obj => {
                if (obj["allResult"].length > 0) {
                  let students = obj["allResult"];
                  students.forEach(studentObj => {
                    let answers = studentObj["answers"];
                    let attemptQuestion = 0;
                    let totalScore = 0;
                    let wrongAns = 0;
                    answers.forEach(ansObj => {
                      if (ansObj["giverAns"] !== "") {
                        attemptQuestion++;
                        if (ansObj["giverAns"] === ansObj["ans"]) {
                          totalScore++;
                        } else {
                          wrongAns++;
                        }
                      }
                    });
                    studentObj.totalQuestions = answers.length;
                    studentObj.attemptQuestion = attemptQuestion;
                    studentObj.totalScore = totalScore;
                    studentObj.wrongAns = wrongAns;
                  });
                }
              });
              console.log(this.performance);
            });
        });
      });
  }
  showResult(batchId, studentId) {
    this.performance.filter(performanceObj => {
      if (performanceObj["batchId"] === batchId) {
        let selectedperformanceObj = performanceObj;
        selectedperformanceObj["allResult"].filter(resultObj => {
          if (resultObj["studentId"] === studentId) {
            this.answers = resultObj["answers"];
          }
        });
      }
    });
  }
}
