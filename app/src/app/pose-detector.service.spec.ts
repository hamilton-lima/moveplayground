import { TestBed } from '@angular/core/testing';

import { PoseDetectorService } from './pose-detector/pose-detector.service';

describe('PoseDetectorService', () => {
  let service: PoseDetectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoseDetectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
