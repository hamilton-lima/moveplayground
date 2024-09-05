import { Injectable } from '@angular/core';
import {
  AuthError,
  AuthOtpResponse,
  createClient,
  SupabaseClient,
} from '@supabase/supabase-js';
import { environment } from './environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private static supabase: SupabaseClient;

  constructor() {}

  client() {
    if (!SupabaseService.supabase) {
      SupabaseService.supabase = createClient(
        environment.supabaseProjectURL,
        environment.supabaseApiKey
      );
    }
    return SupabaseService.supabase;
  }

  signInWithEmail(email: string): Promise<AuthOtpResponse> {
    return this.client().auth.signInWithOtp({ email });
  }

  signOut(): Promise<{ error: AuthError | null }> {
    return this.client().auth.signOut();
  }

  getUser() {
    return this.client().auth.getUser();
  }

  // Example method to fetch data from a public table
  async findAll(tableName: string) {
    const { data, error } = await this.client().from(tableName).select('*');
    if (error) {
      console.error('Error fetching data:', error);
      return [];
    }
    return data;
  }

  async addOne(table: string, properties: object) {
    const { data, error } = await this.client()
      .from(table)
      .insert([properties])
      .select();

    if (error) {
      console.error('Error inserting data:', error.message);
    } else {
      console.log('Record added successfully:', data);
    }

    if (data) {
      return data[0];
    }

    return data;
  }

  async findOne(table: string, value: string, field: string = 'id') {
    const { data, error } = await this.client()
      .from(table)
      .select('*')
      .eq(field, value)
      .single(); // Ensure that only one record is returned

    if (error) {
      console.error(
        `Error fetching ${table} with ${field} ${value}:`,
        error.message
      );
      return null;
    }

    return data;
  }
}
