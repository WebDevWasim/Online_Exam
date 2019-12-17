import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-student-performance",
  templateUrl: "./student-performance.component.html",
  styleUrls: ["./student-performance.component.css"]
})
export class StudentPerformanceComponent implements OnInit {
  constructor(private http: HttpClient) {}
  public performances = [];

  ngOnInit() {
    // let studentId = localStorage.getItem("username");
    // this.http.get(`student/getPerformance/${studentId}`).subscribe(res => {
    //   console.log(res["performance"]);
    // });
  }
}
