import { Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { BalloonsGamePageComponent } from './balloons-game-page/balloons-game-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { GameLobbyComponent } from './game-lobby/game-lobby.component';
import { TicTacToeGameComponent } from './game/tic-tac-toe-game/tic-tac-toe-game.component';
import { InvalidGameSessionPageComponent } from './pages/invalid-game-session-page/invalid-game-session-page.component';
import { EmptyGameSessionIDPageComponent } from './pages/empty-game-session-idpage/empty-game-session-idpage.component';

export const routes: Routes = [
  { path: '', component: WelcomePageComponent }, // Default route
  { path: 'balloons', component: BalloonsGamePageComponent }, // /balloons route
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
  { path: '**', component: NotFoundPageComponent }, // /balloons route
];
