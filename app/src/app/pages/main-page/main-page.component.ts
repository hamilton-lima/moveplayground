import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../supabase.service';
import { CurrentUserService } from '../../auth/current-user.service';
import { User } from '@supabase/supabase-js';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../footer/footer.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, FooterComponent, FormsModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent implements OnInit {
  user: User | undefined = undefined;
  email: string = '';
  emailSent = false;
  error = undefined;

  constructor(
    private supabaseService: SupabaseService,
    private currentUser: CurrentUserService
  ) {}

  async ngOnInit(): Promise<void> {
    this.user = await this.currentUser.get();
  }

  login() {
    this.supabaseService
      .signInWithEmail(this.email)
      .then((response) => {
        this.emailSent = true;
      })
      .catch((error) => {
        this.error = error;
      });
  }
}
