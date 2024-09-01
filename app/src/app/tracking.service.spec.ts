import { TestBed } from '@angular/core/testing';
import { TrackingService } from './tracking.service';

describe('TrackingServiceService', () => {
  let service: TrackingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
