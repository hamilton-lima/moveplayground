import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../supabase.service';
import { AlertInfoComponent } from '../daisy/alert-info/alert-info.component';
import { AlertErrorComponent } from '../daisy/alert-error/alert-error.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-email-input',
  standalone: true,
  imports: [FormsModule, AlertInfoComponent, AlertErrorComponent, CommonModule],
  templateUrl: './email-input.component.html',
  styleUrl: './email-input.component.scss',
})
export class EmailInputComponent {
  email: string = '';
  emailSent = false;
  error: unknown;

  constructor(private supabaseService: SupabaseService) {}

  async login() {
    this.emailSent = false;
    this.error = undefined;

    try {
      const response = await this.supabaseService.signInWithEmail(this.email);
      if (response.error) {
        this.error = response.error;
      } else {
        this.emailSent = true;
      }
    } catch (error) {
      this.error = error;
    }
  }
}
