import { Injectable } from '@angular/core';
import { DataStorageService } from '../../data-storage.service';
import { AppStateService } from '../../app-state.service';

export enum TicTacToeParticipationSymbol {
  circle = 'circle',
  cross = 'cross',
  observer = 'observer',
}

@Injectable({
  providedIn: 'root',
})
export class TicTacToeGameService {
  constructor(
    private dataStorage: DataStorageService,
    private appState: AppStateService
  ) {}

  async findGameSession(sessionID: string): Promise<any> {
    // Validate the session by fetching session information
    const session = await this.dataStorage.findOne(
      'game_session',
      sessionID,
      'external_id'
    );
    return session;
  }

  async createGameParticipation(sessionID: string): Promise<any> {
    // Retrieve the participant ID from the AppStateService
    const participantID = this.appState.getParticipantId();

    const participationRecord = {
      game_session: sessionID,
      participant: participantID,
    };

    try {
      // Attempt to create a new participation record
      const participation = await this.dataStorage.addOne(
        'game_session_participation',
        participationRecord
      );

      if (participation) {
        console.log(
          'Participation record created successfully:',
          participation
        );
        return participation;
      } else {
        throw new Error('Failed to create participation record');
      }
    } catch (error) {
      // If there's an error, try to find the existing participation
      const existingParticipation = await this.dataStorage
        .client()
        .from('game_session_participation')
        .select('*')
        .eq('game_session', sessionID)
        .eq('participant', participantID)
        .single();

      if (existingParticipation.data) {
        console.log(
          'Found existing participation record:',
          existingParticipation.data
        );
        return existingParticipation.data;
      } else {
        console.error('No existing participation record found.');
        return null;
      }
    }
  }

  async determineSymbol(
    participation: any
  ): Promise<TicTacToeParticipationSymbol> {
    // Fetch all participation records for the same game_session, sorted by created_at
    const { data: sessionParticipations, error } = await this.dataStorage
      .client()
      .from('game_session_participation')
      .select('*')
      .eq('game_session', participation.game_session)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching participation records:', error);
      return TicTacToeParticipationSymbol.observer;
    }

    // Find the index of the current participation in the sorted list
    const index = sessionParticipations.findIndex(
      (p: any) => p.id === participation.id
    );

    // Determine the symbol based on the index
    if (index === 0) {
      return TicTacToeParticipationSymbol.circle;
    } else if (index === 1) {
      return TicTacToeParticipationSymbol.cross;
    } else {
      return TicTacToeParticipationSymbol.observer;
    }
  }
}
