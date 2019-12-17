import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenBatchComponent } from './open-batch.component';

describe('OpenBatchComponent', () => {
  let component: OpenBatchComponent;
  let fixture: ComponentFixture<OpenBatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenBatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
