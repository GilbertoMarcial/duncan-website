import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { map } from 'rxjs';

// Models
import { Product } from '../models/product';
import { ProductFull } from '../models/product-full';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private _http: HttpClient, 
    private _supabaseSevice: SupabaseService
  ) {
  }

  /* ************ Begin Archivo json ************ */
  // Función que permite obtener los productos que se muestran en el Home desde un JSON
  getProductsHome() {
    return this._http.get('assets/data/productsHome.json');
  }

  // Función que obtiene los datos de un producto de acuerdo con su key
  getProductByKey(key: string) {
    return this._http.get<any[]>('assets/data/products.json').pipe(
      map((products) => products.filter(p => p.key === key))
    );
  }
  /* ************ End Archivo json ************ */

  /* ************ Begin Supabase ************ */
  // Función que obtiene los datos de 3 productos para mostrar en el Home
  async getProductsHomeFromServer(): Promise<Pick<Product, 'id' | 'key' | 'name' | 'subname'>[]> {
    const { data, error } = await this._supabaseSevice.client
      .from('products')
      .select(`
        id, 
        key, 
        name, 
        subname, 
        categories (
          key, 
          lines (
            key, 
            brands (
              key
            )
          )
        )
      `)
      .in('key', ['m4100', 'm7100', 'f8300']);

    if (error) {
      console.error('Error al obtener los productos:', error);
      return [];
    }

    return data;
  }

  // Función que obtiene los datos de 3 productos para mostrar en el Home
  async getProductByKeyFromServer(key: string): Promise<ProductFull> {
    const { data, error } = await this._supabaseSevice.client
      .from('products')
      .select(`
        *,
        categories (
          key, 
          lines (
            key, 
            brands (
              key
            )
          )
        )
      `)
      .eq('key', key)
      .single();

    if (error) {
      console.error('Error al obtener el producto:', error);
      return new ProductFull(0, '', '', '', '', '', '', '', [], '');
    }

    // Mapemoas los datos del producto
    const product: ProductFull = new ProductFull(
      data.id,
      data.key,
      data.name,
      data.subname,
      data.description,
      data.features,
      data.benefits,
      data.accesories,
      data.related,
      data.url
    );

    return product;
  }
  /* ************ End Supabase ************ */
}
