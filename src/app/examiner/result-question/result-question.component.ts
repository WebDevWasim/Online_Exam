import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-result-question",
  templateUrl: "./result-question.component.html",
  styleUrls: ["./result-question.component.css"]
})
export class ResultQuestionComponent implements OnInit {
  public examname;
  public questions = [];

  constructor(private activeRoute: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    let examiner = localStorage.getItem("username");

    this.examname = this.activeRoute.snapshot.parent.paramMap.get("examname");

    this.http
      .get(`examiner/getPerformanceArrayDetails/${examiner}/${this.examname}`)
      .subscribe(res => {
        this.questions = res["questions"];
      });
  }
}
