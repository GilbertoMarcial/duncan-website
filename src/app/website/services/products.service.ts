import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private _http: HttpClient
  ) { }

  // Función que permite obtener los productos que se muestran en el Home
  getProductsHome() {
    return this._http.get('assets/data/productsHome.json');
  }

  // Función que obtiene los datos de un producto de acuerdo con su key
  getProductByKey(key: string) {
    return this._http.get<any[]>('assets/data/products.json').pipe(
      map((products) => products.filter(p => p.key === key))
    );
  }
}
