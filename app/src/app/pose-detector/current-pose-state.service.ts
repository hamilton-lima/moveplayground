import { Injectable } from '@angular/core';
import { Pose } from '@tensorflow-models/pose-detection';
import { Subject } from 'rxjs';

export class Hand {
  name: 'left' | 'right' = 'left';
  x: number = 0;
  y: number = 0;
  radius: number = 0;
}

@Injectable({
  providedIn: 'root',
})
export class CurrentPoseStateService {
  poses: Subject<Pose[]> = new Subject();
  handDetected: Subject<Hand> = new Subject();
  constructor() {}

  moveHand(hand: Hand) {
    this.handDetected.next(hand);
  }
}
