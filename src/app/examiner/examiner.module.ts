import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ExaminerRoutingModule } from "./examiner-routing.module";
import { ExaminerRegisterComponent } from "./examiner-register/examiner-register.component";
import { ExaminerLoginComponent } from "./examiner-login/examiner-login.component";
import { ExaminerDashboardComponent } from "./examiner-dashboard/examiner-dashboard.component";
import { ExaminerExamComponent } from "./examiner-exam/examiner-exam.component";
import { ExaminerStudentComponent } from "./examiner-student/examiner-student.component";
import { VerifyStudentComponent } from "./verify-student/verify-student.component";
import { StudentListComponent } from "./student-list/student-list.component";
import { OpenBatchComponent } from "./open-batch/open-batch.component";
import { ExamListComponent } from "./exam-list/exam-list.component";
import { ExaminerPerformanceComponent } from "./examiner-performance/examiner-performance.component";
import { OpenExamComponent } from "./open-exam/open-exam.component";
import { CheckResultComponent } from "./check-result/check-result.component";
import { ResultQuestionComponent } from "./result-question/result-question.component";
import { ResultMarkComponent } from "./result-mark/result-mark.component";
import { StudentDataSearchPipe } from "./student-data-search.pipe";
import { ExaminerProfileComponent } from './examiner-profile/examiner-profile.component';

@NgModule({
  declarations: [
    ExaminerRegisterComponent,
    ExaminerLoginComponent,
    ExaminerDashboardComponent,
    ExaminerExamComponent,
    ExaminerStudentComponent,
    VerifyStudentComponent,
    StudentListComponent,
    OpenBatchComponent,
    ExamListComponent,
    ExaminerPerformanceComponent,
    OpenExamComponent,
    CheckResultComponent,
    ResultQuestionComponent,
    ResultMarkComponent,
    StudentDataSearchPipe,
    ExaminerProfileComponent
  ],
  imports: [CommonModule, ExaminerRoutingModule, FormsModule, HttpClientModule]
})
export class ExaminerModule {}
