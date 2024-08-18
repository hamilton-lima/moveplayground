import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-video-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-preview.component.html',
  styleUrl: './video-preview.component.scss',
})
export class VideoPreviewComponent implements AfterViewInit {
  @ViewChild('videoPlayer') videoRef: ElementRef | null = null;
  error: string | undefined = undefined;

  async ngAfterViewInit(): Promise<boolean> {
    if (!this.videoRef || !this.videoRef.nativeElement) {
      this.error = 'Not able to initialize video element';
      console.warn(this.error);
      return false;
    }

    const video = this.videoRef.nativeElement;
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'user',
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
  }
}
