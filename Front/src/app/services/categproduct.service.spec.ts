

import { TestBed } from '@angular/core/testing';

import { CategproductService } from './categproduct.service';

describe('CategproductService', () => {
  let service: CategproductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategproductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
