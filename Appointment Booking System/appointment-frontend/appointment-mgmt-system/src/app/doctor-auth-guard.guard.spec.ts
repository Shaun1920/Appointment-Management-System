import { TestBed } from '@angular/core/testing';

import { DoctorAuthGuardGuard } from './doctor-auth-guard.guard';

describe('DoctorAuthGuardGuard', () => {
  let guard: DoctorAuthGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DoctorAuthGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
