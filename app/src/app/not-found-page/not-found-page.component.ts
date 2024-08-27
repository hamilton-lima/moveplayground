import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './not-found-page.component.html',
  styleUrl: './not-found-page.component.scss',
})
export class NotFoundPageComponent {
  constructor(private router: Router) {}

  home() {
    this.router.navigate(['/']);
  }
}
