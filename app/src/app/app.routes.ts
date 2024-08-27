import { Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { BalloonsGamePageComponent } from './balloons-game-page/balloons-game-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';

export const routes: Routes = [
  { path: '', component: WelcomePageComponent }, // Default route
  { path: 'balloons', component: BalloonsGamePageComponent }, // /balloons route
  { path: '**', component: NotFoundPageComponent }, // /balloons route
];
