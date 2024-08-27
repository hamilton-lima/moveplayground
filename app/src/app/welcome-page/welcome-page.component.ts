import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, CommonModule],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss',
})
export class WelcomePageComponent {
  ready = false;
  constructor(private router: Router) {}

  balloonsGame() {
    this.router.navigate(['/balloons']);
  }

  askCameraAccess() {
    console.log('ask camera access');
  }
}
