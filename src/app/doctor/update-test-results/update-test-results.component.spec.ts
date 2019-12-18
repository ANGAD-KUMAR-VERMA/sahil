import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTestResultsComponent } from './update-test-results.component';

describe('UpdateTestResultsComponent', () => {
  let component: UpdateTestResultsComponent;
  let fixture: ComponentFixture<UpdateTestResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTestResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTestResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
