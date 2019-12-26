import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import decode from "jwt-decode";

@Component({
  selector: "app-add-examiner",
  templateUrl: "./add-examiner.component.html",
  styleUrls: ["./add-examiner.component.css"]
})
export class AddExaminerComponent implements OnInit {
  constructor(private http: HttpClient) {}

  public examinerObj: any = {};
  public show: boolean = false;

  // Decoding Token
  public token = localStorage.getItem("token");
  public payload = decode(this.token);
  ngOnInit() {}

  searchExaminer(examinerId) {
    this.http.get(`student/searchExaminer/${examinerId}`).subscribe(res => {
      if (res["message"] == "Incorrect Examiner ID") {
        alert(res["message"]);
      } else {
        this.examinerObj = res["message"];
        this.show = true;
      }
    });
  }

  sendExaminerRequest(batchID) {
    let examinerId = this.examinerObj["username"];
    let dataObj = {
      // studentId: this.payload.username,
      studentId: localStorage.getItem("username"),
      batchId: batchID.toLowerCase()
    };

    this.http
      .put(`student/sendRequestToSir/${examinerId}`, dataObj)
      .subscribe(res => {
        alert(res["message"]);
      });
  }
}
