import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-begin-exam",
  templateUrl: "./begin-exam.component.html",
  styleUrls: ["./begin-exam.component.css"]
})
export class BeginExamComponent implements OnInit {
  public batchId;
  public examname;
  public exam = {};

  constructor(private activeRoute: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.activeRoute.params.subscribe(res => {
      this.examname = res["examname"];
      this.batchId = res["batchId"];
      let studentId = localStorage.getItem("username");
      this.http
        .get(`student/getBatchExam/${this.batchId}/${studentId}`)
        .subscribe(res => {
          let allExams = res["exam"];
          let examArr = allExams.filter(examObj => {
            return examObj["examname"] == this.examname;
          });
          this.exam = examArr[0];
        });
    });
  }

  submitAnswers(resultObj) {
    let questions = Object.keys(resultObj);
    let resultArr = [];
    let questionsArr = this.exam["questions"];
    for (let question of questions) {
      let obj = {
        qname: question,
        ans: resultObj[question]
      };
      resultArr.push(obj);
    }

    let finalResult = [];
    questionsArr.forEach(question => {
      resultArr.forEach(result => {
        if (question.qname == result.qname) {
          question.giverAns = result.ans;
          delete question.qid;
          finalResult.push(question);
        }
      });
    });

    let performanceObj = {
      studentId: localStorage.getItem("username"),
      batchId: this.batchId,
      examname: this.examname,
      answers: finalResult
    };

    console.log(performanceObj);

    this.http.put(`student/addResult`, performanceObj).subscribe(res => {
      console.log(res["message"]);
    });
  }
}
