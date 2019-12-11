import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicareSericeDetailsComponent } from './medicare-serice-details.component';

describe('MedicareSericeDetailsComponent', () => {
  let component: MedicareSericeDetailsComponent;
  let fixture: ComponentFixture<MedicareSericeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicareSericeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicareSericeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
