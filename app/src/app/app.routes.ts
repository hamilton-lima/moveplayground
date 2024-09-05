import { Routes } from '@angular/router';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { BalloonsGamePageComponent } from './pages/balloons-game-page/balloons-game-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { GameLobbyComponent } from './game-lobby/game-lobby.component';
import { TicTacToeGameComponent } from './game/tic-tac-toe-game/tic-tac-toe-game.component';
import { InvalidGameSessionPageComponent } from './pages/invalid-game-session-page/invalid-game-session-page.component';
import { EmptyGameSessionIDPageComponent } from './pages/empty-game-session-idpage/empty-game-session-idpage.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { AuthenticatedOnlyGuard } from './auth/authenticated-only.guard';
import { LoginPageComponent } from './pages/login-page/login-page.component';

export const routes: Routes = [
  // Main public page
  { path: '', component: MainPageComponent },
  { path: 'login', component: LoginPageComponent },

  // All routes under /user are protected by the AuthGuard
  {
    path: 'user',
    canActivate: [AuthenticatedOnlyGuard],
    children: [
      { path: 'play', component: WelcomePageComponent },
      { path: 'balloons', component: BalloonsGamePageComponent },
      { path: 'lobby/:gameName', component: GameLobbyComponent },
      {
        path: 'play/tic-tac-toe/:externalID',
        component: TicTacToeGameComponent,
      },
      {
        path: 'play/error/invalid-session-id/:externalID',
        component: InvalidGameSessionPageComponent,
      },
      {
        path: 'play/error/empty-session-id',
        component: EmptyGameSessionIDPageComponent,
      },
    ],
  },

  // Wildcard route for 404 - Not Found page
  { path: '**', component: NotFoundPageComponent },
];
