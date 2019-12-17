import { HttpClient } from "@angular/common/http";
import { LoggedUserService } from "./../../logged-user.service";
import { Component, OnInit, OnChanges } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-examiner-batch",
  templateUrl: "./examiner-batch.component.html",
  styleUrls: ["./examiner-batch.component.css"]
})
export class ExaminerBatchComponent implements OnInit, OnChanges {
  constructor(
    private activeRoute: ActivatedRoute,
    private http: HttpClient,
    private loggedUser: LoggedUserService,
    private router: Router
  ) {}

  public batchArray = [];
  ngOnInit() {
    this.activeRoute.params.subscribe(routeParams => {
      const dataObj = {
        examinerId: routeParams.examinerId,
        studentId: localStorage.getItem("username")
      };

      this.http
        .get(
          `student/getExaminerBatch/${dataObj.examinerId}/${dataObj.studentId}`
        )
        .subscribe(res => {
          this.batchArray = [];
          for (let batchId of res["message"]) {
            this.http
              .get(`student/getBatchDetails/${dataObj.examinerId}/${batchId}`)
              .subscribe(res => {
                this.batchArray.push(res["message"]);
              });
          }
        });
    });
  }
  ngOnChanges() {}

  enterBatch(batchId) {
    this.router.navigate(["../../enter-batch", batchId], {
      relativeTo: this.activeRoute
    });
  }
}
