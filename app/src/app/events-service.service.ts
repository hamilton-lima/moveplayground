import { Injectable } from '@angular/core';
import { environment } from './environments/environment';
import mixpanel from 'mixpanel-browser';
import { VERSION } from './version';

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
    properties = {
      ...properties,
      version: VERSION,
    };

    console.log('[events.track]', event, properties);
    mixpanel.track(event, properties);
  }

  identify(userId: string) {
    console.log('[events.identify]', userId);
    mixpanel.identify(userId);
    mixpanel.people.set({ $name: userId });
  }
}
