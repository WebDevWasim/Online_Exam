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
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public allBatch = [];
  public currentBatch = {};
  fetchBatch() {
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

  editBatch(batchId) {
    let currentBatchArr = (this.currentBatch = this.allBatch.filter(
      batchObj => {
        return batchObj["batchId"] === batchId;
      }
    ));
    this.currentBatch = currentBatchArr[0];
  }

  updateBatch(batchObj, batchId) {
    batchObj.batchId = batchId;
    this.http.put(`examiner/updateBatch`, batchObj).subscribe(res => {
      if (res["message"] == "Batch Updated Successfully") {
        this.fetchBatch();
      }
    });
  }

  deleteBatch(batchId) {
    let batchObj = {
      batchId: batchId
    };
    // this.http.put(`examiner/deleteBatch`, batchObj).subscribe(res => {
    //   if (res["message"] == "Batch Removed Successfully") {
    //     console.log("success");

    //     this.fetchBatch();
    //   }
    // });
  }
  openBatch(batchId) {
    this.router.navigate(["../open-batch", batchId], {
      relativeTo: this.route
    });
  }
}
