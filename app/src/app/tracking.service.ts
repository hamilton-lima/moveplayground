import { Injectable } from '@angular/core';
import { Router, NavigationEnd, Route } from '@angular/router';
import { EventsService } from './events.service';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrackingService {
  allRoutePaths: string[] = [];
  constructor(private router: Router, private events: EventsService) {}

  initAutoTracking() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(async (event: NavigationEnd) => {
        const cleanUrl = this.removeParamFromUrl(event.urlAfterRedirects);
        // Send a Mixpanel event for the page view
        this.events.track('page.viewed', {
          page: cleanUrl,
        });
      });

    this.allRoutePaths = this.getAllRoutePaths();
    console.log('allRoutePaths', this.allRoutePaths);
  }

  getAllRoutePaths(): string[] {
    const paths: string[] = [];
    const routes = this.router.config;
    this.extractPaths(routes, '', paths);
    return paths;
  }

  private extractPaths(routes: Route[], parentPath: string, paths: string[]) {
    routes.forEach((route) => {
      const currentPath = parentPath + (route.path ? `/${route.path}` : '');
      paths.push(currentPath);

      if (route.children) {
        this.extractPaths(route.children, currentPath, paths);
      }
    });
  }

  // Function to remove the parameter part from the URL
  removeParamFromUrl(url: string) {
    // Iterate over each route in the routes array
    for (let route of this.allRoutePaths) {
      // Skip wildcard routes to avoid invalid regex errors
      if (route.includes('*')) {
        continue;
      }

      // Replace the parameter part (e.g., :sessionID) with a regex pattern to match any value (e.g., '[^/]+')
      const routePattern = route.replace(/:\w+/g, '[^/]+');

      // Create a regular expression to match the entire URL against the modified route pattern
      const regex = new RegExp(`^${routePattern}$`);

      // If the URL matches this route pattern, it means this is the correct route
      if (regex.test(url)) {
        // Remove the last segment from the URL (which corresponds to the parameter) and return the result
        return url.replace(/\/[^/]+$/, '');
      }
    }

    // If no matching route is found, return the original URL
    return url;
  }
}
