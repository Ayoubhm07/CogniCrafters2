import { TestBed } from '@angular/core/testing';

import { MyMemoryTranslationServiceService } from './my-memory-translation-service.service';

describe('MyMemoryTranslationServiceService', () => {
  let service: MyMemoryTranslationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyMemoryTranslationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
