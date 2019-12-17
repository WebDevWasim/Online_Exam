import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminerBatchComponent } from './examiner-batch.component';

describe('ExaminerBatchComponent', () => {
  let component: ExaminerBatchComponent;
  let fixture: ComponentFixture<ExaminerBatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExaminerBatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExaminerBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
