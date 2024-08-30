import { Component } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { EventsServiceService } from './events-service.service';
import { filter, take } from 'rxjs';

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
    private events: EventsServiceService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Listen to router events
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Send a Mixpanel event for the page view
        this.events.track('page.viewed', {
          page: event.urlAfterRedirects,
        });
      });

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        take(1) // Ensures that the identifyUser method is only called once
      )
      .subscribe((event: NavigationEnd) => {
        // Extract the name parameter from the URL and pass it to identifyUser
        const nameFromUrl = this.activatedRoute.snapshot.queryParams['name'];
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
