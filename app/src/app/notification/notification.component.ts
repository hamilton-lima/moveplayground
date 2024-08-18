import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
})
export class NotificationComponent implements OnInit {
  message = '';

  constructor(private notification: NotificationService) {}

  ngOnInit(): void {
    this.notification.message.subscribe((message) => {
      this.message = message;
    });
  }
}
