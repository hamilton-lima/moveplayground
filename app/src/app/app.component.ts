import { Component } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { EventsService } from './events.service';
import { filter, take } from 'rxjs';
import { TrackingService } from './tracking.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  currentUserId: string | null = null;

  constructor(
    private router: Router,
    private events: EventsService,
    private activatedRoute: ActivatedRoute,
    private pageNavigationTracking: TrackingService
  ) {}

  ngOnInit(): void {
    this.pageNavigationTracking.initAutoTracking();

    // Identify user only once on the first navigation
    this.activatedRoute.queryParams.pipe(take(1)).subscribe((params) => {
      const nameFromUrl = params['name'];
      this.identifyUser(nameFromUrl);
    });
  }

  private identifyUser(nameFromUrl: string | null): void {
    // Try to get user from localStorage
    this.currentUserId = localStorage.getItem('userId');

    if (!this.currentUserId) {
      if (nameFromUrl) {
        // User found in URL parameters
        this.currentUserId = nameFromUrl;
        localStorage.setItem('userId', this.currentUserId!);
      } else {
        // No user found, generate a new UUID
        this.currentUserId = crypto.randomUUID();
        localStorage.setItem('userId', this.currentUserId!);
      }
    }

    // Identify user in Mixpanel
    this.events.identify(this.currentUserId!);
  }
}
