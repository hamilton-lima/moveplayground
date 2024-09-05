import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoSourceSelectorComponent } from './video-source-selector.component';

describe('VideoSourceSelectorComponent', () => {
  let component: VideoSourceSelectorComponent;
  let fixture: ComponentFixture<VideoSourceSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoSourceSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoSourceSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
