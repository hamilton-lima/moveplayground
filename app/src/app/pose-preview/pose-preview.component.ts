import { Component, Input, OnInit } from '@angular/core';
import { PoseDetectorService } from '../pose-detector/pose-detector.service';
import { Pose } from '@tensorflow-models/pose-detection';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { PoseDrawerComponent } from '../pose-drawer/pose-drawer.component';
import { NotificationService } from '../notification.service';
import { PreviewRefreshHelper } from '../preview-refresh.helper';

@Component({
  selector: 'app-pose-preview',
  standalone: true,
  imports: [CommonModule, PoseDrawerComponent],
  templateUrl: './pose-preview.component.html',
  styleUrl: './pose-preview.component.scss',
})
export class PosePreviewComponent implements OnInit {
  @Input() video: Subject<HTMLVideoElement> | null = null;

  videoElement: HTMLVideoElement | null = null;
  output: string | null = null;
  poses: Pose[] = [];
  private refresh: PreviewRefreshHelper;

  constructor(
    private poseDectectorService: PoseDetectorService,
    private notification: NotificationService
  ) {
    this.refresh = PreviewRefreshHelper.getInstance();
  }

  async ngOnInit(): Promise<void> {
    if (this.video) {
      this.video.subscribe(async (videoElement: HTMLVideoElement) => {
        this.videoElement = videoElement;
      });
    }

    await this.poseDectectorService.initPoseDetection();
    this.startPreview();
  }

  startPreview() {
    this.refresh.setup(20);
    this.refresh.render.subscribe(() => {
      this.previewPose();
    });
    this.refresh.start();
  }

  async previewPose() {
    this.check4Errors();

    if (this.videoElement && this.poseDectectorService.isReady()) {
      this.poses = await this.poseDectectorService.detect(this.videoElement);
    }
  }

  check4Errors() {
    this.notification.clear();
    const errors = [];
    if (!this.videoElement) {
      errors.push('No video found to estimate poses');
    }
    if (!this.poseDectectorService.isReady()) {
      errors.push('Pose detector is not ready');
    }
    if (errors.length > 0) {
      this.notification.warning(errors.join('<br>'));
    }
  }
}
