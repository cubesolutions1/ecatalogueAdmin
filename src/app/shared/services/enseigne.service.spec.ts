import { TestBed } from '@angular/core/testing';

import { EnseigneService } from './enseigne.service';

describe('EnseigneService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnseigneService = TestBed.get(EnseigneService);
    expect(service).toBeTruthy();
  });
});
