import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { PoseDetectorService } from '../pose-detector.service';
import { PoseDetector } from '@tensorflow-models/pose-detection';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-pose-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pose-preview.component.html',
  styleUrl: './pose-preview.component.scss',
})
export class PosePreviewComponent implements OnInit {
  @Input() video: Subject<HTMLVideoElement> | null = null;

  videoElement: HTMLVideoElement | null = null;
  error: string | undefined = undefined;
  output: string | null = null;

  constructor(private poseDectectorService: PoseDetectorService) {}
  async ngOnInit(): Promise<void> {
    console.log('video subject', this.video);
    if (this.video) {
      this.video.subscribe(async (videoElement: HTMLVideoElement) => {
        this.videoElement = videoElement;
        await this.previewPose();
      });
    }

    await this.poseDectectorService.initPoseDetection();
    await this.previewPose();
  }

  async previewPose() {
    console.log(
      'preview pose',
      this.videoElement,
      this.poseDectectorService.isReady()
    );
    this.check4Errors();

    if (this.videoElement && this.poseDectectorService.isReady()) {
      console.log('detect pose');
      const poses = await this.poseDectectorService.detect(this.videoElement);
      console.log('detect pose', poses);
      this.output = JSON.stringify(poses);
    }
  }

  check4Errors() {
    this.error = undefined;
    const errors = [];
    if (!this.videoElement) {
      errors.push('No video found to estimate poses');
    }
    if (!this.poseDectectorService.isReady()) {
      errors.push('Pose detector is not ready');
    }
    if (errors.length > 0) {
      this.error = errors.join('<br>');
    }
  }
}
