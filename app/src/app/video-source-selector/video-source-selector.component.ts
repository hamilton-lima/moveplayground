import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-video-source-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-source-selector.component.html',
  styleUrl: './video-source-selector.component.scss',
})
export class VideoSourceSelectorComponent implements OnInit {
  @Input() selectedCameraID: string | null = null; // Input to receive selected video device ID
  cameras: MediaDeviceInfo[] = [];
  @Output() cameraSelected = new EventEmitter<string>();

  constructor(private notification: NotificationService) {}

  async ngOnInit(): Promise<void> {
    try {
      // Get available video input devices (cameras)
      const devices = await navigator.mediaDevices.enumerateDevices();
      this.cameras = devices.filter((device) => device.kind === 'videoinput');

      if (!this.selectedCameraID) {
        console.log('No camera selected, preselecting first camera from list');
        this.selectCamera(this.cameras[0].deviceId);
      }

    } catch (err) {
      const message = 'Not able to initialize video element';
      this.notification.warning(message);
      console.warn(message, err);
    }
  }

  selectCamera(selectedCameraID: string) {
    this.selectedCameraID = selectedCameraID;
    this.cameraSelected.emit(selectedCameraID);
  }
}
