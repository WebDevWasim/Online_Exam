import { ResultQuestionComponent } from "./result-question/result-question.component";
import { ResultMarkComponent } from "./result-mark/result-mark.component";
import { CheckResultComponent } from "./check-result/check-result.component";
import { OpenExamComponent } from "./open-exam/open-exam.component";
import { ExaminerPerformanceComponent } from "./examiner-performance/examiner-performance.component";
import { ExamListComponent } from "./exam-list/exam-list.component";
import { OpenBatchComponent } from "./open-batch/open-batch.component";
import { ExaminerExamComponent } from "./examiner-exam/examiner-exam.component";
import { ExaminerDashboardComponent } from "./examiner-dashboard/examiner-dashboard.component";
import { ExaminerLoginComponent } from "./examiner-login/examiner-login.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ExaminerRegisterComponent } from "./examiner-register/examiner-register.component";
import { ExaminerStudentComponent } from "./examiner-student/examiner-student.component";
import { VerifyStudentComponent } from "./verify-student/verify-student.component";
import { StudentListComponent } from "./student-list/student-list.component";

const routes: Routes = [
  { path: "examiner/login", component: ExaminerLoginComponent },
  { path: "examiner/register", component: ExaminerRegisterComponent },
  {
    path: "examiner/dashbord/:username",
    component: ExaminerDashboardComponent,
    children: [
      { path: "", redirectTo: "exam", pathMatch: "full" },
      {
        path: "exam",
        component: ExaminerExamComponent,
        children: [
          { path: "", redirectTo: "exam-list", pathMatch: "full" },
          {
            path: "exam-list",
            component: ExamListComponent
          },
          {
            path: "performance",
            component: ExaminerPerformanceComponent
          },
          {
            path: "open-exam/:examname",
            component: OpenExamComponent
          },
          {
            path: "check-result/:examname",
            component: CheckResultComponent,
            children: [
              { path: "", redirectTo: "marks", pathMatch: "full" },
              {
                path: "marks",
                component: ResultMarkComponent
              },
              {
                path: "questions",
                component: ResultQuestionComponent
              }
            ]
          }
        ]
      },
      {
        path: "student",
        component: ExaminerStudentComponent,
        children: [
          { path: "", redirectTo: "student-list", pathMatch: "full" },
          {
            path: "verify-student",
            component: VerifyStudentComponent
          },
          {
            path: "student-list",
            component: StudentListComponent
          },
          {
            path: "open-batch/:batchId",
            component: OpenBatchComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExaminerRoutingModule {}
