import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminerStudentComponent } from './examiner-student.component';

describe('ExaminerStudentComponent', () => {
  let component: ExaminerStudentComponent;
  let fixture: ComponentFixture<ExaminerStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExaminerStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExaminerStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
