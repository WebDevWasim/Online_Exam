import { BeginExamComponent } from "./begin-exam/begin-exam.component";
import { EnterBatchComponent } from "./enter-batch/enter-batch.component";
import { StudentExamComponent } from "./student-exam/student-exam.component";
import { StudentPerformanceComponent } from "./student-performance/student-performance.component";
import { StudentDashboardComponent } from "./student-dashboard/student-dashboard.component";
import { StudentLoginComponent } from "./student-login/student-login.component";
import { StudentRegisterComponent } from "./student-register/student-register.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddExaminerComponent } from "./add-examiner/add-examiner.component";
import { ExaminerBatchComponent } from "./examiner-batch/examiner-batch.component";
import { CheckPerformanceComponent } from "./check-performance/check-performance.component";

const routes: Routes = [
  { path: "student/login", component: StudentLoginComponent },
  { path: "student/register", component: StudentRegisterComponent },
  {
    path: "student/dashbord/:username",
    component: StudentDashboardComponent,
    children: [
      { path: "", redirectTo: "exam", pathMatch: "full" },
      {
        path: "exam",
        component: StudentExamComponent,
        children: [
          {
            path: "search-examiner",
            component: AddExaminerComponent
          },
          {
            path: "examiner-batch/:examinerId",
            component: ExaminerBatchComponent
          },
          {
            path: "enter-batch/:batchId",
            component: EnterBatchComponent
          },
          {
            path: "begin-exam/:batchId/:examname",
            component: BeginExamComponent
          }
        ]
      },
      {
        path: "performance",
        component: StudentPerformanceComponent
      },
      {
        path: "performance/:batchId/:examname",
        component: CheckPerformanceComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {}
