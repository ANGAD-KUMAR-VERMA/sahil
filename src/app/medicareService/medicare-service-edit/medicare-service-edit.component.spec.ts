import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicareServiceEditComponent } from './medicare-service-edit.component';

describe('MedicareServiceEditComponent', () => {
  let component: MedicareServiceEditComponent;
  let fixture: ComponentFixture<MedicareServiceEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicareServiceEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicareServiceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
