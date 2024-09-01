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

@Component({
  selector: 'app-tic-tac-toe-game',
  standalone: true,
  imports: [
    CommonModule,
    FooterComponent,
    NotificationComponent,
    VideoSourceSelectorComponent,
    PosePreviewComponent,
  ],
  templateUrl: './tic-tac-toe-game.component.html',
  styleUrls: ['./tic-tac-toe-game.component.scss'],
})
export class TicTacToeGameComponent implements OnInit, AfterViewInit {
  sessionID: string | null = null;
  gameSessionParticipantion: any;
  selectedCameraID: string | null = null;
  video: Subject<HTMLVideoElement> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataStorage: DataStorageService,
    private appStateService: AppStateService,
    private cdr: ChangeDetectorRef
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
    this.sessionID = this.route.snapshot.paramMap.get('sessionID');
    if (!this.sessionID) {
      // If sessionID is not available, navigate to a not found page
      this.router.navigate(['/play/error']);
      return;
    }

    // Validate the session by fetching session information
    const session = await this.dataStorage.findOne(
      'game_session',
      this.sessionID,
      'external_id'
    );

    if (!session) {
      // If the session is not valid, navigate to a not found page
      this.router.navigate(['/play/error/invalid-session-id', this.sessionID]);
      return;
    }

    // If the session is valid, create a participation record
    const participantID = crypto.randomUUID();

    const participationRecord = {
      game_session: session.id,
      participant: participantID,
    };

    this.gameSessionParticipantion = await this.dataStorage.addOne(
      'game_session_participation',
      participationRecord
    );

    if (this.gameSessionParticipantion) {
      console.log(
        'Participation record created successfully:',
        this.gameSessionParticipantion
      );
    } else {
      console.error('Failed to create participation record');
    }
  }
}
