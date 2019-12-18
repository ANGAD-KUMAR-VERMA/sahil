import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTestResultComponent } from './view-test-result.component';

describe('ViewTestResultComponent', () => {
  let component: ViewTestResultComponent;
  let fixture: ComponentFixture<ViewTestResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTestResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTestResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
