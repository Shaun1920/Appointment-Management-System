import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorStaffSidebarComponent } from './doctor-staff-sidebar.component';

describe('DoctorStaffSidebarComponent', () => {
  let component: DoctorStaffSidebarComponent;
  let fixture: ComponentFixture<DoctorStaffSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorStaffSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorStaffSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
