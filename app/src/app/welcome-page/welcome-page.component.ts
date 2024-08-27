import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { GreenBalloonGameComponent } from '../green-balloon-game/green-balloon-game.component';
import { NotificationComponent } from '../notification/notification.component';
import { PosePreviewComponent } from '../pose-preview/pose-preview.component';
import { VideoPreviewComponent } from '../video-preview/video-preview.component';
import { VideoSourceSelectorComponent } from '../video-source-selector/video-source-selector.component';
import { Subject } from 'rxjs';
import { AppStateService } from '../app-state.service';

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [
    RouterOutlet,
    VideoPreviewComponent,
    VideoSourceSelectorComponent,
    PosePreviewComponent,
    NotificationComponent,
    GreenBalloonGameComponent,
    FooterComponent,
  ],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss',
})
export class WelcomePageComponent implements AfterViewInit {
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
