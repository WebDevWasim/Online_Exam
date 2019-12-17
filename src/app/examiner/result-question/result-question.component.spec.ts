import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultQuestionComponent } from './result-question.component';

describe('ResultQuestionComponent', () => {
  let component: ResultQuestionComponent;
  let fixture: ComponentFixture<ResultQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
