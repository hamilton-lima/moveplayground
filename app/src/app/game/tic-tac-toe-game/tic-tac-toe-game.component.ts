import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStorageService } from '../../data-storage.service';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../footer/footer.component';
import { NotificationComponent } from '../../notification/notification.component';
import { VideoSourceSelectorComponent } from '../../video-source-selector/video-source-selector.component';
import { PosePreviewComponent } from '../../pose-preview/pose-preview.component';
import { AppStateService } from '../../app-state.service';
import { Subject } from 'rxjs';
import { VideoPreviewComponent } from '../../video-preview/video-preview.component';
import { TicTacToeGameRenderComponent } from './tic-tac-toe-game-render/tic-tac-toe-game-render.component';
import {
  TicTacToeGameService,
  TicTacToeParticipationSymbol,
} from './tic-tac-toe-game.service';

@Component({
  selector: 'app-tic-tac-toe-game',
  standalone: true,
  imports: [
    CommonModule,
    FooterComponent,
    NotificationComponent,
    VideoSourceSelectorComponent,
    PosePreviewComponent,
    VideoPreviewComponent,
    TicTacToeGameRenderComponent,
  ],
  templateUrl: './tic-tac-toe-game.component.html',
  styleUrls: ['./tic-tac-toe-game.component.scss'],
})
export class TicTacToeGameComponent implements OnInit, AfterViewInit {
  externalID: string | null = null;
  gameSessionParticipation: any;
  selectedCameraID: string | null = null;
  video: Subject<HTMLVideoElement> = new Subject();
  symbol: TicTacToeParticipationSymbol | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appStateService: AppStateService,
    private cdr: ChangeDetectorRef,
    private service: TicTacToeGameService
  ) {}

  ngAfterViewInit(): void {
    this.selectedCameraID = this.appStateService.getSelectedCamera();
    this.cdr.detectChanges();
  }

  onVideoReady(video: HTMLVideoElement) {
    console.log('video updated', video);
    this.video.next(video);
  }

  onCameraSelected(selectedCameraID: string) {
    this.selectedCameraID = selectedCameraID;
    this.appStateService.saveSelectedCamera(selectedCameraID);
  }

  async ngOnInit() {
    this.externalID = this.route.snapshot.paramMap.get('externalID');
    if (!this.externalID) {
      // If sessionID is not available, navigate to a not found page
      this.router.navigate(['/play/error']);
      return;
    }

    const session = await this.service.findGameSession(this.externalID);

    if (!session) {
      // If the session is not valid, navigate to a not found page
      this.router.navigate(['/play/error/invalid-session-id', this.externalID]);
      return;
    }

    this.gameSessionParticipation = await this.service.createGameParticipation(
      session.id
    );

    this.symbol = await this.service.determineSymbol(
      this.gameSessionParticipation
    );
  }
}
