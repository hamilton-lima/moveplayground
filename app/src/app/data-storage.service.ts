import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from './environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  private static supabase: SupabaseClient;

  constructor() {}

  client() {
    if (!DataStorageService.supabase) {
      DataStorageService.supabase = createClient(
        environment.supabaseProjectURL,
        environment.supabaseApiKey
      );
    }
    return DataStorageService.supabase;
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
}
