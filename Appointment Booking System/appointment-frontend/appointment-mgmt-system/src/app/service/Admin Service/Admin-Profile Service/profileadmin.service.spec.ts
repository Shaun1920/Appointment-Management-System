import { TestBed } from '@angular/core/testing';

import { ProfileadminService } from './profileadmin.service';

describe('ProfileadminService', () => {
  let service: ProfileadminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileadminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
