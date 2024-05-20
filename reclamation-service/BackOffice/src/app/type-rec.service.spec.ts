import { TestBed } from '@angular/core/testing';

import { TypeRecService } from './type-rec.service';

describe('TypeRecService', () => {
  let service: TypeRecService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeRecService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
