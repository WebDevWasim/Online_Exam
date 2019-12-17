import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultMarkComponent } from './result-mark.component';

describe('ResultMarkComponent', () => {
  let component: ResultMarkComponent;
  let fixture: ComponentFixture<ResultMarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultMarkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultMarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
