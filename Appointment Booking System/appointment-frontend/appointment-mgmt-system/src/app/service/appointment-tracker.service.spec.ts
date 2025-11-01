import { TestBed } from '@angular/core/testing';

import { AppointmentTrackerService } from './appointment-tracker.service';

describe('AppointmentTrackerService', () => {
  let service: AppointmentTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointmentTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
