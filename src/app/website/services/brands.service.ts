import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { map } from 'rxjs';

// Models
import { Brand } from '../models/brand';


@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(
    private _http: HttpClient, 
    private _supabaseSevice: SupabaseService
  ) {
  }

  /* ************ Begin Archivo json ************ */
  // Función que obtiene los datos de las marcas desde un archivo json
  getBrands() {
    return this._http.get('assets/data/brandsMin.json');
  }

  // Función que obtiene los datos de una marca de acuerdo a su key desde un archivo json
  getBrandsByKey(key: string) {
    return this._http.get<any[]>('assets/data/brands.json').pipe(
      map((brands) => brands.filter(b => b.key === key))
    );
  }
  /* ************ End Archivo json ************ */

  /* ************ Begin Supabase ************ */
  // Función que obtiene los datos de las marcas de la base de datos desde supabase
  async getBrandsFromServer(): Promise<Brand[]> {
    const { data, error } = await this._supabaseSevice.client
      .from('brands')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.error('Error al obtener las marcas:', error);
      return [];
    }

    return data;
  }

  // Función que obtiene los datos de una marca de la base de datos a través de su key
  // desde supabase
  async getBrandByKeyFromServer(key: string): Promise<Brand> {
    const { data, error } = await this._supabaseSevice.client
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
  /* ************ End Supabase ************ */
}
