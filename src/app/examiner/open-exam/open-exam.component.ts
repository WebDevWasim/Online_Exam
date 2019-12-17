import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-open-exam",
  templateUrl: "./open-exam.component.html",
  styleUrls: ["./open-exam.component.css"]
})
export class OpenExamComponent implements OnInit {
  public examname;
  public questions = [];
  public currentQuestion = {};
  constructor(private activeRoute: ActivatedRoute, private http: HttpClient) {}

  loadQuestionsList() {
    let examiner = localStorage.getItem("username");
    this.http
      .get(`examiner/getExamQuestions/${examiner}/${this.examname}`)
      .subscribe(res => {
        this.questions = res["message"];
      });
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(res => {
      this.examname = res["examname"];
    });
    this.loadQuestionsList();
  }

  addQuestion(form) {
    let questionObj = form.value;

    let qId = () => {
      return Math.random() * 786;
    };
    questionObj.qid = qId();
    let examiner = localStorage.getItem("username");
    this.http
      .put(`examiner/addQuestion/${examiner}/${this.examname}`, questionObj)
      .subscribe(res => {
        if (res["message"] == "New Question Added Successfully") {
          this.loadQuestionsList();
          form.reset();
        }
      });
  }

  editQuestion(questionId) {
    this.questions.forEach(questionObj => {
      if (questionObj.qid === questionId) {
        this.currentQuestion = questionObj;
      }
    });
  }

  updateQuestion(questionObj) {
    let examiner = localStorage.getItem("username");

    questionObj.qid = this.currentQuestion["qid"];

    console.log(questionObj);

    this.http
      .put(`examiner/updateQuestion/${examiner}`, questionObj)
      .subscribe(res => {
        if (res["message"] == "New Question Updated Successfully") {
          console.log("updated");

          this.loadQuestionsList();
        }
      });
  }

  deleteQuestion(questionId) {
    let examiner = localStorage.getItem("username");
    let obj = {
      username: examiner,
      qid: questionId
    };
    this.http.put(`examiner/removeQuestion`, obj).subscribe(res => {
      if (res["message"] == "Question Removed") {
        this.loadQuestionsList();
      }
    });
  }
}
