import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { StudentRoutingModule } from "./student-routing.module";
import { StudentDashboardComponent } from "./student-dashboard/student-dashboard.component";
import { StudentRegisterComponent } from "./student-register/student-register.component";
import { StudentLoginComponent } from "./student-login/student-login.component";
import { StudentExamComponent } from './student-exam/student-exam.component';
import { StudentPerformanceComponent } from './student-performance/student-performance.component';
import { AddExaminerComponent } from './add-examiner/add-examiner.component';
import { ExaminerBatchComponent } from './examiner-batch/examiner-batch.component';
import { EnterBatchComponent } from './enter-batch/enter-batch.component';
import { BeginExamComponent } from './begin-exam/begin-exam.component';

@NgModule({
  declarations: [
    StudentDashboardComponent,
    StudentRegisterComponent,
    StudentLoginComponent,
    StudentExamComponent,
    StudentPerformanceComponent,
    AddExaminerComponent,
    ExaminerBatchComponent,
    EnterBatchComponent,
    BeginExamComponent
  ],
  imports: [CommonModule, StudentRoutingModule, FormsModule]
})
export class StudentModule {}
