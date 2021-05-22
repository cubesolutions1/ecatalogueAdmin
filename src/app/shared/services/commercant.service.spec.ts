import { TestBed } from '@angular/core/testing';

import { CommercantService } from './commercant.service';

describe('CommercantService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommercantService = TestBed.get(CommercantService);
    expect(service).toBeTruthy();
  });
});
