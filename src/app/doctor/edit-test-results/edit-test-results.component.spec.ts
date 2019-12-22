import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTestResultsComponent } from './edit-test-results.component';

describe('EditTestResultsComponent', () => {
  let component: EditTestResultsComponent;
  let fixture: ComponentFixture<EditTestResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTestResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTestResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
