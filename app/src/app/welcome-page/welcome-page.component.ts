import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [RouterOutlet, FooterComponent],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss',
})
export class WelcomePageComponent {
  constructor(private router: Router) {}

  gotoGame() {
    this.router.navigate(['/balloons']);
  }
}
