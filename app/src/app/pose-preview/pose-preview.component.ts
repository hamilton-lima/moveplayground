import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { PoseDetectorService } from '../pose-detector.service';
import { PoseDetector } from '@tensorflow-models/pose-detection';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pose-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pose-preview.component.html',
  styleUrl: './pose-preview.component.scss',
})
export class PosePreviewComponent implements OnInit {
  @Input() video: HTMLVideoElement | null = null;
  error: string | undefined = undefined;
  output: string | null = null;

  constructor(private poseDectectorService: PoseDetectorService) {}
  async ngOnInit(): Promise<void> {
    await this.poseDectectorService.initPoseDetection();
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (changes['video']) {
      await this.previewPose();
    }
  }

  async previewPose() {
    console.log('preview pose');
    this.check4Errors();

    if (this.video && this.poseDectectorService.isReady()) {
      const poses = await this.poseDectectorService.detect(this.video);
      this.output = JSON.stringify(poses);
    }
  }

  check4Errors() {
    this.error = undefined;
    const errors = [];
    if (!this.video) {
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
