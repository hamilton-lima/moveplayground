import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { RouterOutlet, ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { firstValueFrom, Subject } from 'rxjs';
import { AppStateService } from '../../app-state.service';
import { GreenBalloonGameComponent } from '../../games/green-balloon-game/green-balloon-game.component';
import { PosePreviewComponent } from '../../pose-preview/pose-preview.component';
import { VideoPreviewComponent } from '../../video-preview/video-preview.component';
import { VideoSourceSelectorComponent } from '../../components/video-source-selector/video-source-selector.component';
import { CommonPageComponent } from '../../components/common-page/common-page.component';
import { SoundEffectsService } from '../../sound-effects.service';
import { CommonModule } from '@angular/common';
import { TimerComponent } from '../../components/daisy/timer/timer.component';

@Component({
  selector: 'app-balloons-game-page',
  standalone: true,
  imports: [
    RouterOutlet,
    VideoPreviewComponent,
    VideoSourceSelectorComponent,
    PosePreviewComponent,
    GreenBalloonGameComponent,
    CommonPageComponent,
    CommonModule,
    TimerComponent,
  ],
  templateUrl: './balloons-game-page.component.html',
  styleUrl: './balloons-game-page.component.scss',
})
export class BalloonsGamePageComponent implements AfterViewInit, OnInit {
  selectedCameraID: string | null = null;
  video: Subject<HTMLVideoElement> = new Subject();
  time2Show = '';
  redCounter = 0;
  greenCounter = 0;
  minutes: number = 0; // Add a variable to store minutes
  remainingMinutes = 0;
  remainingSeconds = 0;
  gameDuration = 0;
  ready = false;

  constructor(
    private appStateService: AppStateService,
    private cdr: ChangeDetectorRef,
    private sound: SoundEffectsService,
    private route: ActivatedRoute // Inject ActivatedRoute
  ) {}

  async ngOnInit() {
    // Get the minutes parameter from the route, default to 0 if not provided
  }

  async ngAfterViewInit() {
    const params = await firstValueFrom(this.route.paramMap);
    const minutesParam = params.get('minutes');
    this.minutes = minutesParam ? +minutesParam : 0; // Use 0 if no minutes are provided
    console.log(`Received minutes: ${this.minutes}`);
    this.gameDuration = this.minutes * 60000;

    this.selectedCameraID = this.appStateService.getSelectedCamera();
    this.cdr.detectChanges();
    this.ready = true;
    console.log('ready', this.gameDuration);
  }

  onRedBalloon() {
    this.redCounter++;
    this.sound.playNegativeFeedback();
    this.cdr.detectChanges();
  }

  onGreenBalloon() {
    this.greenCounter++;
    this.sound.playPositiveFeedback();
    this.cdr.detectChanges();
  }

  onTimeUpdate(currentTime: number) {
    const totalMatchTimeInSeconds = this.minutes * 60; // Convert total match time to seconds
    const elapsedTimeInSeconds = Math.floor(currentTime / 1000); // Convert currentTime from milliseconds to seconds
    const remainingTimeInSeconds =
      totalMatchTimeInSeconds - elapsedTimeInSeconds; // Calculate the remaining time

    if (remainingTimeInSeconds <= 0) {
      this.time2Show = '0:00'; // Handle the case where the time is up
    } else {
      const minutes = Math.floor(remainingTimeInSeconds / 60);
      const seconds = remainingTimeInSeconds % 60;

      // Format time as minutes:seconds (e.g., 3:09)
      this.time2Show = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
      this.remainingMinutes = minutes;
      this.remainingSeconds = seconds;
    }

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
