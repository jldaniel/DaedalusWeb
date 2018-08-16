import { TestBed, inject } from '@angular/core/testing';

import { DaedalusService } from './daedalus.service';

describe('DaedalusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DaedalusService]
    });
  });

  it('should be created', inject([DaedalusService], (service: DaedalusService) => {
    expect(service).toBeTruthy();
  }));
});
