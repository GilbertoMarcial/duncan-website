import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs';

// Models
import { Brand } from '../models/brand';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  private supabase: SupabaseClient;

  constructor(
    private _http: HttpClient
  ) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  // Función que permite obtener las marcas que se muestran en Todas las marcas
  getBrands() {
    return this._http.get('assets/data/brandsMin.json');
  }

  // Función que obtiene los datos de una marca de acuerdo a su key
  getBrandsByKey(key: string) {
    return this._http.get<any[]>('assets/data/brands.json').pipe(
      map((brands) => brands.filter(b => b.key === key))
    );
  }

  // Función que obtiene los datos de las marcas de la base de datos
  async getBrandsForServer(): Promise<Brand[]> {
    const { data, error } = await this.supabase
      .from('brands')
      .select('*');

    if (error) {
      console.error('Error al obtener las marcas:', error);
      return [];
    }

    return data;
  }

  // Función que obtiene los datos de una marca de la base de datos a través de su key
  async getBrandByKey(key: string): Promise<Brand> {
    const { data, error } = await this.supabase
      .from('brands')
      .select(`
        *, 
        lines(
          *
        )
      `)
      .eq('key', key)
      .single();
    
    if (error) {
      console.error('Error al obtener la marca:', error);
      return new Brand(0, '', '', '', {}, '', '', '', []);
    }

    // Mapeamos los datos de la marca
    const brand: Brand = new Brand(
      data.id,
      data.key,
      data.name,
      data.website,
      data.about,
      data.bg_color_1,
      data.bg_color_2,
      data.bg_image,
      data.lines
    );

    return brand;
  }
}
