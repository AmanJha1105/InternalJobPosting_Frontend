import { TestBed } from '@angular/core/testing';

import { AllApplicationService } from './all-application.service';

describe('AllApplicationService', () => {
  let service: AllApplicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllApplicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
