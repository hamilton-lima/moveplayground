import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-video-source-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-source-selector.component.html',
  styleUrl: './video-source-selector.component.scss',
})
export class VideoSourceSelectorComponent implements OnInit {
  error: string | null = null;
  selectedCameraID: string | null = null;
  cameras: MediaDeviceInfo[] = [];
  @Output() cameraSelected = new EventEmitter<string>();

  async ngOnInit(): Promise<void> {
    try {
      // Get available video input devices (cameras)
      const devices = await navigator.mediaDevices.enumerateDevices();
      this.cameras = devices.filter((device) => device.kind === 'videoinput');
      console.log(this.cameras);
      // Start the video stream using the selected camera
    } catch (err) {
      this.error = 'Not able to initialize video element';
      console.warn(this.error, err);
    }
  }

  selectCamera(selectedCameraID: string) {
    this.selectedCameraID = selectedCameraID;
    this.cameraSelected.emit(selectedCameraID);
  }
}
