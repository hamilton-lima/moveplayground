import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  private readonly SELECTED_CAMERA_KEY = 'selectedCamera';

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
}
