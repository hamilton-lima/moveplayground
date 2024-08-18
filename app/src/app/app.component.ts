import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VideoPreviewComponent } from './video-preview/video-preview.component';
import { VideoSourceSelectorComponent } from './video-source-selector/video-source-selector.component';
import { AppStateService } from './app-state.service';
import { PosePreviewComponent } from './pose-preview/pose-preview.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    VideoPreviewComponent,
    VideoSourceSelectorComponent,
    PosePreviewComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  selectedCameraID: string | null = null;
  video: HTMLVideoElement | null = null;

  constructor(private appStateService: AppStateService) {}

  ngOnInit(): void {
    this.selectedCameraID = this.appStateService.getSelectedCamera();
  }

  onCameraSelected(selectedCameraID: string) {
    this.selectedCameraID = selectedCameraID;
    this.appStateService.saveSelectedCamera(selectedCameraID);
  }

  onVideoReady(video: HTMLVideoElement) {
    this.video = video;
  }
}
