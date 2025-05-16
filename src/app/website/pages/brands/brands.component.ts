import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Title } from '@angular/platform-browser';

// Services
import { BrandsService } from '../../services/brands.service';
import { SoftwareService } from '../../services/software.service';

@Component({
  selector: 'app-brands',
  imports: [CommonModule, RouterModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit {
  brands!: any;
  software!: any;
  loading = true;
  error = '';

  constructor(
    private _brandsService: BrandsService,
    private _softwareService: SoftwareService,
    private _title: Title
  ) { }

  ngOnInit(): void {
    // Quitar comentario para conectar a supabase/json
    // this.getBrands();
    this.getBrandsFromServer();
    this.getSoftwareFromServer();
    this._title.setTitle('Productos y servicios - Duncan Engineering Company');
  }

  /* ************ Begin Archivo json ************ */
  // Función que se conecta al servicio y obtiene los datos de las marcas 
  // desde un archivo json
  getBrands() {
    this._brandsService.getBrands().subscribe(brands => {
      this.brands = brands;
    });
  }
  /* ************ End Archivo json ************ */

  /* ************ Begin Supabase ************ */
  // Función que se conecta al servicio y obtiene los datos de las marcas 
  // desde supabase
  async getBrandsFromServer() {
    try {
      this.brands = await this._brandsService.getBrandsFromServer();
      console.log(this.brands);
    } catch (err: any) {
      console.error('Error al obtener las marcas:', err);
    } finally {
      this.loading = false;
    }
  }

  // Función que se conecta al servicio y obtiene los datos de los softwares 
  // desde supabase
  async getSoftwareFromServer() {
    try {
      this.software = await this._softwareService.getSoftwareFromServer();
      console.log(this.software);
    } catch (err: any) {
      console.error('Error al obtener los softwares:', err);
    } finally {
      this.loading = false;
    }
  }
  /* ************ End Supabase ************ */

}
