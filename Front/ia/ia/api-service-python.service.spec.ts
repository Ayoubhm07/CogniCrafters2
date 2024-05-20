import { TestBed } from '@angular/core/testing';

import { ApiServicePythonService } from './api-service-python.service';

describe('ApiServicePythonService', () => {
  let service: ApiServicePythonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiServicePythonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
