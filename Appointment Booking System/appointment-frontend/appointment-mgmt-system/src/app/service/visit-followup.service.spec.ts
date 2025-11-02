import { TestBed } from '@angular/core/testing';

import { VisitFollowupService } from './visit-followup.service';

describe('VisitFollowupService', () => {
  let service: VisitFollowupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisitFollowupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
