import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subject } from 'rxjs';
import { AppStateService } from '../app-state.service';
import { FooterComponent } from '../footer/footer.component';
import { GreenBalloonGameComponent } from '../green-balloon-game/green-balloon-game.component';
import { NotificationComponent } from '../notification/notification.component';
import { PosePreviewComponent } from '../pose-preview/pose-preview.component';
import { VideoPreviewComponent } from '../video-preview/video-preview.component';
import { VideoSourceSelectorComponent } from '../video-source-selector/video-source-selector.component';

@Component({
  selector: 'app-balloons-game-page',
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
  templateUrl: './balloons-game-page.component.html',
  styleUrl: './balloons-game-page.component.scss',
})
export class BalloonsGamePageComponent implements AfterViewInit {
  selectedCameraID: string | null = null;
  video: Subject<HTMLVideoElement> = new Subject();
  time2Show = '';
  redCounter = 0;
  greenCounter = 0;

  constructor(
    private appStateService: AppStateService,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.selectedCameraID = this.appStateService.getSelectedCamera();
    this.cdr.detectChanges();
  }

  onRedBalloon() {
    this.redCounter++;
    this.cdr.detectChanges();
  }

  onGreenBalloon() {
    this.greenCounter++;
    this.cdr.detectChanges();
  }

  onTimeUpdate(currentTime: number) {
    const seconds = Math.floor(currentTime / 1000);
    this.time2Show = `Time: ${seconds} seconds`;
    this.cdr.detectChanges();
  }

  class = 'green-balloon';

  onCameraSelected(selectedCameraID: string) {
    this.selectedCameraID = selectedCameraID;
    this.appStateService.saveSelectedCamera(selectedCameraID);
  }

  onVideoReady(video: HTMLVideoElement) {
    console.log('video updated', video);
    this.video.next(video);
  }
}
