import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { Title } from '@angular/platform-browser';

import { MoreInfoComponent } from '../../shared/more-info/more-info.component';

// Services
import { ProductsService } from '../../services/products.service';

// Models
import { ProductFull } from '../../models/product-full';
import { Product } from '../../models/product';

@Component({
  selector: 'app-products',
  imports: [CommonModule, RouterModule, MoreInfoComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  keyProduct: string = '';
  product: ProductFull = new ProductFull(1, '', '', '', '', '', '', '', [], '');
  aboutSafe!: SafeHtml;
  featuresSafe!: SafeHtml;
  benefitsSafe!: SafeHtml;
  accesoriesSafe!: SafeHtml;
  loading = true;
  error = '';

  constructor(
    private _route: ActivatedRoute, 
    private _sanitizer: DomSanitizer, 
    private _productsService: ProductsService, 
    private _title: Title
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.keyProduct = params['product'];
      // Modificar para conectar a supabase/json
      this.getProductByKey(this.keyProduct);
      // this.getProductByKeyFromServer(this.keyProduct);
    });
  }

  // Función que permite regresar a la página anterior
  goBack() {
    window.history.back();
  }

  /* ************ Begin Archivo json ************ */
  // Función que se conecta al servicio para obtener los datos del producto
  // de acuerdo con su key desde un archivo json
  getProductByKey(key: string) {
    console.log('Desde JSON');
    this._productsService.getProductByKey(key).subscribe((data: any) => {
      this.product = data[0];

      // Sanitizamos el texto en html
      this.aboutSafe = this._sanitizer.bypassSecurityTrustHtml(this.product.description);
  
      // Cambiamos el título de la página
      this._title.setTitle(this.product.name + ' - Duncan Engineering');
    });
  }
  /* ************ End Archivo json ************ */

  /* ************ Begin Supabase ************ */
  // Función que se conecta al servicio para obtener los datos del producto
  // de acuerdo con su key desde supabase
  async getProductByKeyFromServer(key: string) {
    try {
      this.product = await this._productsService.getProductByKeyFromServer(key);

      // Sanitizamos el texto en html
      this.aboutSafe = this._sanitizer.bypassSecurityTrustHtml(this.product.description);
      this.featuresSafe = this._sanitizer.bypassSecurityTrustHtml(this.product.features);
      this.benefitsSafe = this._sanitizer.bypassSecurityTrustHtml(this.product.benefits);
      this.accesoriesSafe = this._sanitizer.bypassSecurityTrustHtml(this.product.accesories)

      // Cambiamos el título de la página
      this._title.setTitle(this.product.name + ' - Duncan Engineering');
    } catch (err: any) {
      console.error('Error al obtener el producto: ', err);
    } finally {
      this.loading = false;
    }
  }
  /* ************ End Supabase ************ */
  
}
