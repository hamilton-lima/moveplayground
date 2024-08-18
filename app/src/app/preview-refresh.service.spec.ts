import { TestBed } from '@angular/core/testing';

import { PreviewRefreshService } from './preview-refresh.service';

describe('PreviewRefreshService', () => {
  let service: PreviewRefreshService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreviewRefreshService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
