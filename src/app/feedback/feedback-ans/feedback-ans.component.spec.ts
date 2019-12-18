import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackAnsComponent } from './feedback-ans.component';

describe('FeedbackAnsComponent', () => {
  let component: FeedbackAnsComponent;
  let fixture: ComponentFixture<FeedbackAnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackAnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackAnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
