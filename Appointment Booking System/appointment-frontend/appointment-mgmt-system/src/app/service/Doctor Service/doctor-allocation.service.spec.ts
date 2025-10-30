import { TestBed } from '@angular/core/testing';

import { DoctorAllocationService } from './doctor-allocation.service';

describe('DoctorAllocationService', () => {
  let service: DoctorAllocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorAllocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
