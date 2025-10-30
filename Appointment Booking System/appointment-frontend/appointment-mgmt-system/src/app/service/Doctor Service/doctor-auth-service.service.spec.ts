import { TestBed } from '@angular/core/testing';

import { DoctorAuthServiceService } from './doctor-auth-service.service';

describe('DoctorAuthServiceService', () => {
  let service: DoctorAuthServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorAuthServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
