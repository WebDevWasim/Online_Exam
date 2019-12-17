import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminerLoginComponent } from './examiner-login.component';

describe('ExaminerLoginComponent', () => {
  let component: ExaminerLoginComponent;
  let fixture: ComponentFixture<ExaminerLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExaminerLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExaminerLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
