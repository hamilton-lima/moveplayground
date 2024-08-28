import { Injectable } from '@angular/core';
import { environment } from './environment/environment';
import mixpanel from 'mixpanel-browser';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class EventsServiceService {
  currentUserId: string | null = '';
  mixpanelService: any;

  constructor() {
    mixpanel.init(environment.mixpanelApiKey);
  }

  track(event: string, properties?: { [key: string]: any }) {
    console.log('[events.track]', event, properties);
    mixpanel.track(event, properties);
  }

  identify(userId: string) {
    console.log('[events.identify]', userId);
    mixpanel.identify(userId);
    mixpanel.people.set({ $name: userId });
  }
}
