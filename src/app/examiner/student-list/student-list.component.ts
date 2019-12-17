import { LoggedUserService } from "./../../logged-user.service";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-student-list",
  templateUrl: "./student-list.component.html",
  styleUrls: ["./student-list.component.css"]
})
export class StudentListComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private loggedUser: LoggedUserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public allBatch = [];
  fetchBatch() {
    // let examiner = this.loggedUser.loggedUserName();
    let examiner = localStorage.getItem("username");
    this.http.get(`examiner/fetchbatch/${examiner}`).subscribe(res => {
      this.allBatch = res["message"];
    });
  }

  ngOnInit() {
    this.fetchBatch();
  }

  addBatch(data) {
    data.student = [];
    data.exam = [];
    // const data1 = {
    //   batchName: data.batchName.toLowerCase(),
    //   batchId: data.batchId.toLowerCase(),
    //   student: []
    // };
    let examiner = localStorage.getItem("username");
    this.http.put(`examiner/addbatch/${examiner}`, data).subscribe(res => {
      if (res["message"] == "New Batch Created Successfully") {
        this.fetchBatch();
      } else {
        alert(res["message"]);
      }
    });
  }

  openBatch(batchId) {
    this.router.navigate(["../open-batch", batchId], {
      relativeTo: this.route
    });
  }
}
