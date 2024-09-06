import { Component } from '@angular/core';
import { CommonPageComponent } from '../../components/common-page/common-page.component';
import { EmailInputComponent } from '../../components/email-input/email-input.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonPageComponent, EmailInputComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {}
