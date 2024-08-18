import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VideoPreviewComponent } from './video-preview/video-preview.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, VideoPreviewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'app';
}
