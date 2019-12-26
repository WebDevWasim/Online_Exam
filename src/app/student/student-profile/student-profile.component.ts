import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-student-profile",
  templateUrl: "./student-profile.component.html",
  styleUrls: ["./student-profile.component.css"]
})
export class StudentProfileComponent implements OnInit {
  constructor(private http: HttpClient) {}
  public studentObj: any = {};
  public message;
  public loading: boolean = false;
  public loadin: boolean = false;
  public successMessage: boolean = false;

  ngOnInit() {
    let studentId = localStorage.getItem("username");
    this.http.get(`student/getStudentDetails/${studentId}`).subscribe(res => {
      this.studentObj = res["message"];
    });
  }

  public file: File;

  profilephoto(event) {
    // getting uploaded files details
    this.file = event.target.files[0];
    let formData = new FormData();
    formData.append("photo", this.file, this.file.name);
    formData.append("studentObj", JSON.stringify(this.studentObj));

    this.loadin = true;
    this.http.put("student/updateStudentPhoto", formData).subscribe(res => {
      this.loadin = false;
      console.log(res["message"]);

      if (res["message"] === "Profile Photo Updated Successfully") {
        this.ngOnInit();
      }
    });
  }

  updateStudent(formObj) {
    let studentId = localStorage.getItem("username");
    this.loading = true;
    this.http
      .put(`student/updateStudentDetails/${studentId}`, formObj)
      .subscribe(res => {
        this.loading = false;

        if (res["message"] === "Student Profile Updated Successfully") {
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
