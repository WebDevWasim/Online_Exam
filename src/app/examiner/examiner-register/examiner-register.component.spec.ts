import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminerRegisterComponent } from './examiner-register.component';

describe('ExaminerRegisterComponent', () => {
  let component: ExaminerRegisterComponent;
  let fixture: ComponentFixture<ExaminerRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExaminerRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExaminerRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
