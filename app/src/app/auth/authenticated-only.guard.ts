import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CurrentUserService } from './current-user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatedOnlyGuard implements CanActivate {
  constructor(
    private currentUserService: CurrentUserService,
    private router: Router
  ) {}

  async canActivate(): Promise<boolean> {
    try {
      // Get the current user
      const user = await this.currentUserService.get();

      // If the user exists (authenticated), allow access
      if (user) {
        return true;
      }

      this.router.navigate(['/login']);
      return false;
    } catch (error) {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
