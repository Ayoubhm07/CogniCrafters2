import { TestBed } from '@angular/core/testing';

import { RoboflowServiceService } from './roboflow-service.service';

describe('RoboflowServiceService', () => {
  let service: RoboflowServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoboflowServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
