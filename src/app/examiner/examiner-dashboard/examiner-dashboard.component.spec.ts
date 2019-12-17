import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminerDashboardComponent } from './examiner-dashboard.component';

describe('ExaminerDashboardComponent', () => {
  let component: ExaminerDashboardComponent;
  let fixture: ComponentFixture<ExaminerDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExaminerDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExaminerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
