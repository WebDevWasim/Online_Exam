import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { EnterBatchComponent } from "./enter-batch.component";

describe("EnterBatchComponent", () => {
  let component: EnterBatchComponent;
  let fixture: ComponentFixture<EnterBatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EnterBatchComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
