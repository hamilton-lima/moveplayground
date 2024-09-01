import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStorageService } from '../../data-storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tic-tac-toe-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tic-tac-toe-game.component.html',
  styleUrls: ['./tic-tac-toe-game.component.scss'],
})
export class TicTacToeGameComponent implements OnInit {
  sessionID: string | null = null;
  gameSessionParticipantion: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataStorage: DataStorageService
  ) {}

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
