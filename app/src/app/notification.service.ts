import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  message: Subject<string> = new Subject();

  warning(text: string) {
    this.message.next(text);
  }

  clear() {
    this.message.next('');
  }
}
