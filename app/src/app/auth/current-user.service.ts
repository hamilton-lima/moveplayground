import { Injectable } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { User } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  user: any;

  constructor(private supabaseService: SupabaseService) {}

  async get(): Promise<User> {
    const response = await this.supabaseService.getUser();
    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data.user;
  }
}
