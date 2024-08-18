import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VideoPreviewComponent } from './video-preview/video-preview.component';
import { VideoSourceSelectorComponent } from './video-source-selector/video-source-selector.component';
import { AppStateService } from './app-state.service';
import { PosePreviewComponent } from './pose-preview/pose-preview.component';
import { BehaviorSubject, Subject } from 'rxjs';
import { NotificationComponent } from './notification/notification.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    VideoPreviewComponent,
    VideoSourceSelectorComponent,
    PosePreviewComponent,
    NotificationComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  selectedCameraID: string | null = null;
  video: Subject<HTMLVideoElement> = new Subject();

  constructor(
    private appStateService: AppStateService,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.selectedCameraID = this.appStateService.getSelectedCamera();
    this.cdr.detectChanges();
  }

  onCameraSelected(selectedCameraID: string) {
    this.selectedCameraID = selectedCameraID;
    this.appStateService.saveSelectedCamera(selectedCameraID);
  }

  onVideoReady(video: HTMLVideoElement) {
    console.log('video updated', video);
    this.video.next(video);
  }
}
