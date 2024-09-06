import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { SupabaseService } from '../supabase.service';
import { environment } from '../environments/environment';
import { EventsService } from '../events.service';

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
    private data: SupabaseService,
    private route: ActivatedRoute,
    private router: Router,
    private events: EventsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(async (params) => {
      const gameName = params.get('gameName');
      if (gameName) {
        this.events.track('game.lobby', {
          gameName: gameName,
          step: 0,
          name: 'start',
        });
        await this.loadGameTypeDetails(gameName);
        await this.createSession();
        this.generateGameURL();
        this.events.track('game.lobby', {
          gameName: gameName,
          step: 2,
          name: 'end',
          gameURL: this.gameURL,
        });
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
    this.events.track('game.lobby', {
      gameName: gameName,
      step: 1,
      name: 'generate-url',
      preffix: preffix,
      id: id,
    });

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
    this.router.navigate(['/play/tic-tac-toe', this.gameSession.external_id]);
  }
}
