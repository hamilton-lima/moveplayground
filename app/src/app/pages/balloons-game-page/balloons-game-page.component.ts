import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { RouterOutlet, ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { Subject } from 'rxjs';
import { AppStateService } from '../../app-state.service';
import { GreenBalloonGameComponent } from '../../games/green-balloon-game/green-balloon-game.component';
import { PosePreviewComponent } from '../../pose-preview/pose-preview.component';
import { VideoPreviewComponent } from '../../video-preview/video-preview.component';
import { VideoSourceSelectorComponent } from '../../components/video-source-selector/video-source-selector.component';
import { CommonPageComponent } from '../../components/common-page/common-page.component';
import { SoundEffectsService } from '../../sound-effects.service';

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

  constructor(
    private appStateService: AppStateService,
    private cdr: ChangeDetectorRef,
    private sound: SoundEffectsService,
    private route: ActivatedRoute // Inject ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get the minutes parameter from the route, default to 0 if not provided
    this.route.paramMap.subscribe((params) => {
      const minutesParam = params.get('minutes');
      this.minutes = minutesParam ? +minutesParam : 0; // Use 0 if no minutes are provided
      console.log(`Received minutes: ${this.minutes}`);
    });
  }

  ngAfterViewInit(): void {
    this.selectedCameraID = this.appStateService.getSelectedCamera();
    this.cdr.detectChanges();
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
    const seconds = Math.floor(currentTime / 1000);
    this.time2Show = `${seconds} seconds`;
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
