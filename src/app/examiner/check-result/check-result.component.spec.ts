import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckResultComponent } from './check-result.component';

describe('CheckResultComponent', () => {
  let component: CheckResultComponent;
  let fixture: ComponentFixture<CheckResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
