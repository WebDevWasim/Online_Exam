import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExaminerComponent } from './add-examiner.component';

describe('AddExaminerComponent', () => {
  let component: AddExaminerComponent;
  let fixture: ComponentFixture<AddExaminerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExaminerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExaminerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
