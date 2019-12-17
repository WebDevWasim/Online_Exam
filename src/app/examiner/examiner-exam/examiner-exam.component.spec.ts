import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminerExamComponent } from './examiner-exam.component';

describe('ExaminerExamComponent', () => {
  let component: ExaminerExamComponent;
  let fixture: ComponentFixture<ExaminerExamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExaminerExamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExaminerExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
