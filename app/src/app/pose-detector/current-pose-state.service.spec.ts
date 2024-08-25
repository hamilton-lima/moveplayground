import { TestBed } from '@angular/core/testing';

import { CurrentPoseStateService } from './current-pose-state.service';

describe('CurrentPoseStateService', () => {
  let service: CurrentPoseStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentPoseStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
