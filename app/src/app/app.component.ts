import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VideoPreviewComponent } from './video-preview/video-preview.component';
import { VideoSourceSelectorComponent } from './video-source-selector/video-source-selector.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, VideoPreviewComponent, VideoSourceSelectorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  onCameraSelected(event: any) {
    console.log('camera selected', event);
  }
}
