import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VideoPreviewComponent } from './video-preview/video-preview.component';
import { VideoSourceSelectorComponent } from './video-source-selector/video-source-selector.component';
import { AppStateService } from './app-state.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, VideoPreviewComponent, VideoSourceSelectorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  selectedCameraID: string | null = null;
  constructor(private appStateService: AppStateService) {}

  ngOnInit(): void {
    this.selectedCameraID = this.appStateService.getSelectedCamera();
  }

  onCameraSelected(selectedCameraID: string) {
    this.selectedCameraID = selectedCameraID;
    this.appStateService.saveSelectedCamera(selectedCameraID);
  }
}
