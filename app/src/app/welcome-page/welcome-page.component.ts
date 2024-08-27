import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { formatErrorForDisplay } from './format.error.function';
import { firstValueFrom, forkJoin, timer } from 'rxjs';

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, CommonModule],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss',
})
export class WelcomePageComponent {
  started = false;
  mediaAPIAvailable = false;
  ready = false;
  error: unknown;
  constructor(private router: Router) {}

  balloonsGame() {
    this.router.navigate(['/balloons']);
  }

  async askCameraAccess() {
    this.checkIfMediaIsAvailable();
    this.started = true;
    console.log('ask camera access');
    try {
      // Create a race between the 5 seconds timer and the getVideoAccess
      await firstValueFrom(
        forkJoin({
          videoAccess: this.getVideoAccess(), // Assuming getVideoAccess returns a Promise or Observable
          delay: timer(3000),
        })
      ); // Wait for both to complete

      this.ready = true;
      this.error = undefined;
    } catch (error) {
      console.error('Camera is not available', error);
      this.ready = false;
      this.error = formatErrorForDisplay(error);
    }
  }

  checkIfMediaIsAvailable() {
    if (navigator.mediaDevices) {
      this.mediaAPIAvailable = true;
    } else {
      this.mediaAPIAvailable = false;
    }
  }

  async getVideoAccess() {
    console.log('start to get media device');
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    console.log('media device found', stream);
  }
}
