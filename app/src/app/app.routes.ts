import { Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { BalloonsGamePageComponent } from './balloons-game-page/balloons-game-page.component';

export const routes: Routes = [
  { path: '', component: WelcomePageComponent }, // Default route
  { path: 'balloons', component: BalloonsGamePageComponent }, // /balloons route
];
