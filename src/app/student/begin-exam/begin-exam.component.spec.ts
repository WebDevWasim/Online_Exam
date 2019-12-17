import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeginExamComponent } from './begin-exam.component';

describe('BeginExamComponent', () => {
  let component: BeginExamComponent;
  let fixture: ComponentFixture<BeginExamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeginExamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeginExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
