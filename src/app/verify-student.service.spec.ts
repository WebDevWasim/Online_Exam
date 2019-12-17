import { TestBed } from '@angular/core/testing';

import { VerifyStudentService } from './verify-student.service';

describe('VerifyStudentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VerifyStudentService = TestBed.get(VerifyStudentService);
    expect(service).toBeTruthy();
  });
});
