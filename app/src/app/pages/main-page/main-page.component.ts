import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../supabase.service';
import { CurrentUserService } from '../../auth/current-user.service';
import { User } from '@supabase/supabase-js';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { EmailInputComponent } from '../../components/email-input/email-input.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, FooterComponent, EmailInputComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent implements OnInit {
  user: User | undefined = undefined;

  constructor(
    private supabaseService: SupabaseService,
    private currentUser: CurrentUserService
  ) {}

  async ngOnInit(): Promise<void> {
    this.user = await this.currentUser.get();
    console.log('user', this.user);
  }
}
