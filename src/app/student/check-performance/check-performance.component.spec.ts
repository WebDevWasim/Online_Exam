import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckPerformanceComponent } from './check-performance.component';

describe('CheckPerformanceComponent', () => {
  let component: CheckPerformanceComponent;
  let fixture: ComponentFixture<CheckPerformanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckPerformanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
