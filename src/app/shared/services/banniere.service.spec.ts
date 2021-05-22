import { TestBed } from '@angular/core/testing';

import { BanniereService } from './banniere.service';

describe('BanniereService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BanniereService = TestBed.get(BanniereService);
    expect(service).toBeTruthy();
  });
});
