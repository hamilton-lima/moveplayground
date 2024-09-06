import { Injectable } from '@angular/core';
import { timer } from 'rxjs';
import * as Tone from 'tone';

@Injectable({
  providedIn: 'root',
})
export class SoundEffectsService {
  synth: Tone.Synth<Tone.SynthOptions>;

  constructor() {
    this.synth = new Tone.Synth().toDestination();
  }

  // Play a "positive" sound with two notes
  async playPositiveFeedback() {
    // Start a Tone context
    await Tone.start();

    // Create a simple melody with two notes for positive feedback
    this.synth.triggerAttackRelease('C5', '8n'); // Middle C for a short duration
    timer(150).subscribe(() => {
      this.synth.triggerAttackRelease('E5', '8n'); // E note shortly after
    }); // 150ms delay between notes for a cheerful effect
  }

  // Play a "negative" sound with descending notes
  async playNegativeFeedback() {
    // Start a Tone context
    await Tone.start();

    // Create a simple melody with two descending notes for negative feedback
    this.synth.triggerAttackRelease('E4', '8n'); // E below middle C for a short duration
    timer(150).subscribe(() => {
      this.synth.triggerAttackRelease('C4', '8n'); // C note below E shortly after
    }); // 150ms delay between notes for a descending effect
  }
}
