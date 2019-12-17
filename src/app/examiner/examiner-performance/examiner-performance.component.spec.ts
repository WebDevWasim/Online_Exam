import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminerPerformanceComponent } from './examiner-performance.component';

describe('ExaminerPerformanceComponent', () => {
  let component: ExaminerPerformanceComponent;
  let fixture: ComponentFixture<ExaminerPerformanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExaminerPerformanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExaminerPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
