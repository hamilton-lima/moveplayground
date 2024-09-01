import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { DataStorageService } from '../data-storage.service';

@Component({
  selector: 'app-game-lobby',
  standalone: true,
  imports: [CommonModule, FooterComponent],
  templateUrl: './game-lobby.component.html',
  styleUrl: './game-lobby.component.scss',
})
export class GameLobbyComponent {
  sessions: any[] = [];
  constructor(private data: DataStorageService) {}
  async createSession() {
    const gameTypes = await this.data.findAll('game_type');
    const filtered = gameTypes.filter((game) => {
      return game.name === 'tic-tac-toe';
    });

    const ticTacToe = filtered[0];
    console.log('tic-tac-toe found', ticTacToe);
    const gameSession = await this.data.add('game_session', {
      game_type: ticTacToe.id,
    });
    console.log('game session', gameSession);
  }
}
