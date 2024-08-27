import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VideoPreviewComponent } from './video-preview/video-preview.component';
import { VideoSourceSelectorComponent } from './video-source-selector/video-source-selector.component';
import { AppStateService } from './app-state.service';
import { PosePreviewComponent } from './pose-preview/pose-preview.component';
import { Subject } from 'rxjs';
import { NotificationComponent } from './notification/notification.component';
import { GreenBalloonGameComponent } from './green-balloon-game/green-balloon-game.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    VideoPreviewComponent,
    VideoSourceSelectorComponent,
    PosePreviewComponent,
    NotificationComponent,
    GreenBalloonGameComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
