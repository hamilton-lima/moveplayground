import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../supabase.service';
import { CurrentUserService } from '../../auth/current-user.service';
import { User } from '@supabase/supabase-js';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { EmailInputComponent } from '../../components/email-input/email-input.component';
import { CommonPageComponent } from '../../components/common-page/common-page.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonPageComponent, EmailInputComponent, CommonModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent implements OnInit {
  user: User | undefined = undefined;

  constructor(
    private currentUser: CurrentUserService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.user = await this.currentUser.get();
  }

  play() {
    this.router.navigate(['/user/play']);
  }
  seeScores() {
    this.router.navigate(['/user/scores']);
  }
}
