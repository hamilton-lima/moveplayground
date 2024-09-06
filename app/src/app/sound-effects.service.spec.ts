import { TestBed } from '@angular/core/testing';

import { SoundEffectsService } from './sound-effects.service';

describe('SoundEffectsService', () => {
  let service: SoundEffectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoundEffectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
