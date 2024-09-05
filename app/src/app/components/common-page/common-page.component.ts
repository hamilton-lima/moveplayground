import { Component, OnInit } from '@angular/core';
import { User } from '@supabase/supabase-js';
import { CurrentUserService } from '../../auth/current-user.service';
import { FooterComponent } from '../../footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-common-page',
  standalone: true,
  imports: [FooterComponent, CommonModule],
  templateUrl: './common-page.component.html',
  styleUrl: './common-page.component.scss',
})
export class CommonPageComponent implements OnInit {
  user: User | undefined = undefined;

  constructor(private currentUser: CurrentUserService) {}

  async ngOnInit(): Promise<void> {
    this.user = await this.currentUser.get();
    console.log('user', this.user);
  }
}
