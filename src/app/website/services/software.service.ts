import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { map } from 'rxjs';

// Models
import { Software } from '../models/software';
import { SoftwareMin } from '../models/software-min';

@Injectable({
  providedIn: 'root'
})
export class SoftwareService {

  constructor(
    private _http: HttpClient, 
    private _supabaseService: SupabaseService
  ) {
  }

  /* ************ Begin Archivo json ************ */
  // Función que obtiene los datos de los softwares desde un archivo json
  getSoftware() {
    return this._http.get('assets/data/software.json');
  }

  // Función que obtiene los datos de un software de acuerdo a su key desde un archivo json
  getSoftwareByKey(key: string) {
    return this._http.get<any[]>('assets/data/software.json').pipe(
      map((software) => software.filter(s => s.key === key))
    );
  }
  /* ************ End Archivo json ************ */

  /* ************ Supabase ************ */
  // Función que obtiene los datos básicos de los softwares de la base de datos desde supabase
  async getSoftwareFromServer(): Promise<SoftwareMin[]> {
    const { data, error } = await this._supabaseService.client
      .from('software')
      .select(`
        id,
        key,
        name,
        subname, 
        bg_color_1,
        bg_color_2
      `);

    if (error) {
      console.error('Error al obtener el software:', error);
      return [];
    }

    return data;
  }

  // Función que obtiene los datos de un software de la base de datos desde supabase
  async getSoftwareByKeyFromServer(key: string): Promise<Software> {
    const { data, error } = await this._supabaseService.client
      .from('software')
      .select(`
        *
      `)
      .eq('key', key)
      .single();

    if (error) {
      console.error('Error al obtener el software:', error);
      return new Software(0, '', '', '', '', '', '', '', '', '', '');
    }

    // Mapeamos los datos del software
    const software: Software = new Software(
      data.id,
      data.key,
      data.name,
      data.subname,
      data.overview,
      data.description,
      data.features,
      data.url,
      data.screenshoots,
      data.bg_color_1,
      data.bg_color_2
    );

    return software;
  }
}
