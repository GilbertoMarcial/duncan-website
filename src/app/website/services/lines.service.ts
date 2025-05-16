import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { map } from 'rxjs';

// Models
import { LineBrand } from '../models/line-full';

@Injectable({
  providedIn: 'root'
})
export class LinesService {

  constructor(
    private _http: HttpClient,
    private _supabaseSevice: SupabaseService
  ) { }

  /* ************ Begin Archivo json ************ */
  // Funcion que obtiene los datos de una línea (perteneciente a una marca) 
  // de acuerdo con su key desde un archivo json
  getLinesByKey(key: string) {
    return this._http.get<any[]>('assets/data/lines.json').pipe(
      map((lines) => lines.filter(l => l.key === key))
    );
  }
  /* ************ End Archivo json ************ */

  /* ************ Begin Supabase ************ */

  // Función que obtiene los datos de una línea (perteneciente a una marca) 
  // de acuerdo con su key desde supabase
  async getLinesByKeyFromServer(key: string): Promise<LineBrand> {
    const { data, error } = await this._supabaseSevice.client
      .from('lines')
      .select(`
        *,
        categories(
          key, 
          name, 
          products (
            key,
            name,
            subname
          )
        )
      `)
      .eq('key', key)
      .single();

    if (error) {
      console.error('Error al obtener la línea:', error);
      return new LineBrand(0, '', '', '', []);
    }

    // Mapeamos los datos de la línea
    const line: LineBrand = new LineBrand(
      data.id,
      data.key,
      data.name,
      data.description,
      data.categories
    );

    return line;
  }
  /* ************ End Supabase ************ */
}
