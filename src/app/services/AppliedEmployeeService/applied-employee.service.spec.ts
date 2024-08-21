import { TestBed } from '@angular/core/testing';

import { AppliedEmployeeService } from './applied-employee.service';

describe('AppliedEmployeeService', () => {
  let service: AppliedEmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppliedEmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
