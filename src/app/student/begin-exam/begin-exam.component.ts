import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-begin-exam",
  templateUrl: "./begin-exam.component.html",
  styleUrls: ["./begin-exam.component.css"]
})
export class BeginExamComponent implements OnInit {
  public batchId;
  public examname;
  public exam = {};
  public startCountdown: string;
  public timer;

  @ViewChild("divClick", { static: false }) divClick: ElementRef<HTMLElement>;
  constructor(
    private activeRoute: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  startTimer(time) {
    // Set the date we're counting down to
    let currentTime = new Date();
    currentTime.setMinutes(currentTime.getMinutes() + time);
    let countDownDate = currentTime.getTime();

    // Update the count down every 1 second
    this.timer = setInterval(() => {
      // Get today's date and time
      let now = new Date().getTime();

      // Find the distance between now and the count down date
      let distance = countDownDate - now;

      // Time calculations for hours, minutes and seconds
      let hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (time > 60) {
        this.startCountdown = hours + " : " + minutes + " : " + seconds;
      } else {
        this.startCountdown = minutes + " : " + seconds;
      }

      // If the count down is over, write some text
      if (distance < 0) {
        clearInterval(this.timer);
        this.startCountdown = "Time Out";
        alert("Time Out");
        this.divClick.nativeElement.click();
      }
    }, 1000);
    this.timer;
  }

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
          // ========= Timer
          let time = this.exam["duration"];
          this.startTimer(time);
        });
    });
  }

  submitAnswers(resultObj) {
    clearInterval(this.timer);
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
      if (
        res["message"] ===
        "Answer Submitted...Go to Performance to Check Result"
      ) {
        this.router.navigate(
          ["../../../../performance", this.batchId, this.examname],
          {
            relativeTo: this.activeRoute
          }
        );
      }
    });
  }
}
