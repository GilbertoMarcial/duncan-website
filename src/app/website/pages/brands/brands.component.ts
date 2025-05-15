import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Title } from '@angular/platform-browser';

// Services
import { BrandsService } from '../../services/brands.service';

@Component({
  selector: 'app-brands',
  imports: [CommonModule, RouterModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit {
  brands!: any;
  loading = true;
  error = '';

  constructor(
    private _brandsService: BrandsService,
    private _title: Title
  ) { }

  ngOnInit(): void {
    this.getBrands();
    // Modificar para conectar a supabase
    // this.getBrandsForServer();
    this._title.setTitle('Productos y servicios - Duncan Engineering Company');
  }

  // Función que se conecta al servicio para obtener las marcas
  getBrands() {
    this._brandsService.getBrands().subscribe(brands => {
      this.brands = brands;
    });
  }

  // Función que obtiene los datos de las marcas de la base de datos
  async getBrandsForServer() {
    try {
      this.brands = await this._brandsService.getBrandsForServer();
      console.log(this.brands);
    } catch (err: any) {
      console.error('Error al obtener las marcas:', err);
    } finally {
      this.loading = false;
    }
  }

}
