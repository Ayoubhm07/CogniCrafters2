import { TestBed } from '@angular/core/testing';

import { PsychologueService } from './psychologue.service';

describe('PsychologueService', () => {
  let service: PsychologueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PsychologueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
