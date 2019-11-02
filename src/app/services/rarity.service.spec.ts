import { TestBed } from '@angular/core/testing';

import { RarityService } from './rarity.service';

describe('RarityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RarityService = TestBed.get(RarityService);
    expect(service).toBeTruthy();
  });
});
