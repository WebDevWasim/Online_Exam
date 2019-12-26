import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-examiner-profile",
  templateUrl: "./examiner-profile.component.html",
  styleUrls: ["./examiner-profile.component.css"]
})
export class ExaminerProfileComponent implements OnInit {
  constructor(private http: HttpClient) {}
  public examinerObj: any = {};
  public message;
  public loading: boolean = false;
  public loadin: boolean = false;
  public successMessage: boolean = false;

  ngOnInit() {
    let examinerId = localStorage.getItem("username");
    this.http
      .get(`examiner/getExaminerDetails/${examinerId}`)
      .subscribe(res => {
        this.examinerObj = res["message"];
      });
  }

  public file: File;

  profilePhoto(event) {
    // getting uploaded files details
    this.file = event.target.files[0];
    let formData = new FormData();
    formData.append("photo", this.file, this.file.name);
    formData.append("examinerObj", JSON.stringify(this.examinerObj));

    this.loadin = true;
    this.http.put("examiner/updateExaminerPhoto", formData).subscribe(res => {
      this.loadin = false;
      console.log(res["message"]);

      if (res["message"] === "Profile Photo Updated Successfully") {
        this.ngOnInit();
      }
    });
  }

  updateExaminer(formObj) {
    let examinerId = localStorage.getItem("username");
    this.loading = true;
    this.http
      .put(`examiner/updateExaminerDetails/${examinerId}`, formObj)
      .subscribe(res => {
        this.loading = false;

        if (res["message"] === "Examiner Profile Updated Successfully") {
          this.successMessage = true;
          setTimeout(() => {
            this.successMessage = false;
          }, 3000);
          this.message = res["message"];
          this.ngOnInit();
        }
      });
  }
}
