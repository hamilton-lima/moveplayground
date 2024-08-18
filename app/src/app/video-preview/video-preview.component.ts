import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-video-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-preview.component.html',
  styleUrls: ['./video-preview.component.scss'], // Fix typo from 'styleUrl' to 'styleUrls'
})
export class VideoPreviewComponent implements AfterViewInit {
  @ViewChild('videoPlayer') videoRef: ElementRef | null = null;
  @Input() selectedCameraID: string | null = null; // Input to receive selected video device ID
  error: string | undefined = undefined;

  async ngAfterViewInit(): Promise<boolean> {
    return this.startVideoStream();
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    // Check if the selectedDeviceId input has changed
    if (
      changes['selectedCameraID'] &&
      !changes['selectedCameraID'].isFirstChange()
    ) {
      // Restart the video stream with the new device ID
      await this.startVideoStream();
    }
  }

  async startVideoStream(): Promise<boolean> {
    this.error = undefined;

    if (!this.videoRef || !this.videoRef.nativeElement) {
      this.error = 'Not able to initialize video element';
      console.warn(this.error);
      return false;
    }

    if (!this.selectedCameraID) {
      this.error = 'No camera selected';
      console.warn(this.error);
      return false;
    }

    try {
      const video = this.videoRef.nativeElement;
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: { exact: this.selectedCameraID }, // Use the selected deviceId for the video stream
          width: { ideal: 640 },
          height: { ideal: 480 },
        },
        audio: false,
      });

      // Wait for the video to start
      const ready = new Promise<boolean>((resolve) => {
        video.onloadedmetadata = () => {
          resolve(true);
        };
      });

      video.srcObject = stream;
      return ready;
    } catch (err) {
      this.error = 'Unable to access the selected camera';
      console.warn(this.error, err);
      return false;
    }
  }
}
