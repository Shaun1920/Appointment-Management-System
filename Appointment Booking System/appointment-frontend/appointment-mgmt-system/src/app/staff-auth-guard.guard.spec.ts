import { TestBed } from '@angular/core/testing';

import { StaffAuthGuardGuard } from './staff-auth-guard.guard';

describe('StaffAuthGuardGuard', () => {
  let guard: StaffAuthGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(StaffAuthGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
