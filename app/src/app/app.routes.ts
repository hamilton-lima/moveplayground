import { Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { BalloonsGamePageComponent } from './balloons-game-page/balloons-game-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { GameLobbyComponent } from './game-lobby/game-lobby.component';
import { TicTacToeGameComponent } from './game/tic-tac-toe-game/tic-tac-toe-game.component';
import { InvalidGameSessionPageComponent } from './pages/invalid-game-session-page/invalid-game-session-page.component';
import { EmptyGameSessionIDPageComponent } from './pages/empty-game-session-idpage/empty-game-session-idpage.component';
import { MainPageComponent } from './pages/main-page/main-page.component';

export const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'play', component: WelcomePageComponent },
  { path: 'balloons', component: BalloonsGamePageComponent },
  { path: 'lobby/:gameName', component: GameLobbyComponent },
  { path: 'play/tic-tac-toe/:externalID', component: TicTacToeGameComponent },
  {
    path: 'play/error/invalid-session-id/:externalID',
    component: InvalidGameSessionPageComponent,
  },
  {
    path: 'play/error/empty-session-id',
    component: EmptyGameSessionIDPageComponent,
  },
  { path: '**', component: NotFoundPageComponent },
];
