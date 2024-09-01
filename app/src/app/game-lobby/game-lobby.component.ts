import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { DataStorageService } from '../data-storage.service';

@Component({
  selector: 'app-game-lobby',
  standalone: true,
  imports: [CommonModule, FooterComponent],
  templateUrl: './game-lobby.component.html',
  styleUrl: './game-lobby.component.scss',
})
export class GameLobbyComponent {
  sessions: any[] = [];
  constructor(private data: DataStorageService) {}
  createSession() {}
}
