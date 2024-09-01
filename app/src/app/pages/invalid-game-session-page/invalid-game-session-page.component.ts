import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-invalid-game-session-page',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './invalid-game-session-page.component.html',
  styleUrl: './invalid-game-session-page.component.scss',
})
export class InvalidGameSessionPageComponent implements OnInit {
  sessionID: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  async ngOnInit() {
    this.sessionID = this.route.snapshot.paramMap.get('sessionID');
  }

  home() {
    this.router.navigate(['/']);
  }
}
