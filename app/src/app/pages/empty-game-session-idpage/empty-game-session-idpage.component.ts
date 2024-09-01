import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-empty-game-session-idpage',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './empty-game-session-idpage.component.html',
  styleUrl: './empty-game-session-idpage.component.scss',
})
export class EmptyGameSessionIDPageComponent {
  constructor(private router: Router) {}

  home() {
    this.router.navigate(['/']);
  }
}
