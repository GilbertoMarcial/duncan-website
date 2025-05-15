import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LinesService {

  constructor(
    private _http: HttpClient
  ) { }

  // Funcion que obtiene los datos de una línea (perteneciente a una marca) 
  // de acuerdo con su key
  getLinesByKey(key: string) {
    return this._http.get<any[]>('assets/data/lines.json').pipe(
      map((lines) => lines.filter(l => l.key === key))
    );
  }
}
