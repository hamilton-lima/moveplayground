import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  private readonly SELECTED_CAMERA_KEY = 'selectedCamera';
  private readonly PARTICIPANT_ID_KEY = 'gameParticipantId';

  constructor() {}

  // Save the selected camera to localStorage
  saveSelectedCamera(deviceId: string): void {
    localStorage.setItem(this.SELECTED_CAMERA_KEY, deviceId);
  }

  // Retrieve the selected camera from localStorage
  getSelectedCamera(): string | null {
    return localStorage.getItem(this.SELECTED_CAMERA_KEY);
  }

  // Clear the saved selected camera
  clearSelectedCamera(): void {
    localStorage.removeItem(this.SELECTED_CAMERA_KEY);
  }

  // Save the game participant ID to localStorage
  saveParticipantId(participantId: string): void {
    localStorage.setItem(this.PARTICIPANT_ID_KEY, participantId);
  }

  // Retrieve the game participant ID from localStorage
  getParticipantId(): string | null {
    let result = localStorage.getItem(this.PARTICIPANT_ID_KEY);
    if (!result) {
      result = crypto.randomUUID();
      this.saveParticipantId(result);
    }
    return result;
  }

  // Clear the saved game participant ID
  clearParticipantId(): void {
    localStorage.removeItem(this.PARTICIPANT_ID_KEY);
  }
}
