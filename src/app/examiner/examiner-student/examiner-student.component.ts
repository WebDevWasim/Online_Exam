import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { VerifyStudentService } from "./../../verify-student.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-examiner-student",
  templateUrl: "./examiner-student.component.html",
  styleUrls: ["./examiner-student.component.css"]
})
export class ExaminerStudentComponent implements OnInit {
  constructor(private http: HttpClient, private verify: VerifyStudentService) {}

  public totalRequest;

  ngOnInit() {
    this.verify.loadRequestList().subscribe(res => {
      this.totalRequest = res["message"].length;
    });
  }
}
