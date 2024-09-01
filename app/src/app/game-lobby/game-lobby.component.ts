import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { DataStorageService } from '../data-storage.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-game-lobby',
  standalone: true,
  imports: [CommonModule, FooterComponent],
  templateUrl: './game-lobby.component.html',
  styleUrls: ['./game-lobby.component.scss'],
})
export class GameLobbyComponent implements OnInit {
  sessions: any[] = [];
  gameType: any;
  gameSession: any;
  gameURL: string = '';
  title = 'Assembling the game parts...';

  constructor(
    private data: DataStorageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(async (params) => {
      const gameName = params.get('gameName');
      if (gameName) {
        await this.loadGameTypeDetails(gameName);
        await this.createSession();
        this.generateGameURL();
      }
    });
  }

  generateGameURL() {
    if (!this.gameSession) {
      console.error('No game session created');
      return;
    }

    const preffix = environment.applicationLinkURLPreffix;
    const gameName = this.gameType.name;
    const id = this.gameSession.external_id;
    console.log('gamesession', this.gameSession);

    this.gameURL = `${preffix}/play/${gameName}/${id}`;
  }

  async loadGameTypeDetails(gameName: string) {
    const gameTypes = await this.data.findAll('game_type');
    const filtered = gameTypes.filter((game) => game.name === gameName);

    if (filtered.length > 0) {
      this.gameType = filtered[0];
      console.log(`${gameName} found`, this.gameType);
    } else {
      console.error(`${gameName} not found`);
    }
  }

  async createSession() {
    if (!this.gameType) {
      console.error('No game type selected');
      return;
    }

    this.gameSession = await this.data.addOne('game_session', {
      game_type: this.gameType.id,
    });
  }

  play() {
    console.log('play');
  }
}
