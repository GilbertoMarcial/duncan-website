import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { Title } from '@angular/platform-browser';

// Services
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  @ViewChild('products') productsSection!: ElementRef;
  @ViewChild('contactForm') contactFormSection!: ElementRef;

  products!: any;
  loading = true;
  error = '';

  constructor(
    private _route: ActivatedRoute, 
    private _productsService: ProductsService,
    private _title: Title
  ) {}

  ngOnInit(): void {
    // this.getProductsHome();
    this.getProductsHomeFromServer();
    this._title.setTitle('Duncan Engineering Company');
  }

  ngAfterViewInit(): void {
    this._route.fragment.subscribe(fragment => {
      if (fragment) {
        setTimeout(() => {
          this.scrollToContact();
        }, 100); // esperamos a que se renderice el DOM
      }
    });
  }

  // Función que permite desplazarse a la sección de productos
  scrollToProducts() {
    const element = document.getElementById('products');
    if (element) {
      const yOffset = -80;
      // element.scrollIntoView({ behavior: 'smooth' });
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  // Función que permite desplazarse a la sección de contacto
  scrollToContact() {
    const element = document.getElementById('contactForm');
    if (element) {
      // Ajustamos valor de acuerdo con la altura del header
      // para no tapar el título de la sección
      const yOffset = -80;
      // element.scrollIntoView({ behavior: 'smooth' });
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      
    }
  }

  /* ************ Archivo json ************ */
  // Función que se conecta al servicio y obtiene los datos de 3 productos 
  // desde un archivo json
  getProductsHome() {
    this._productsService.getProductsHome().subscribe(products => {
      this.products = products;
    });
  }

  /* ************ Supabase ************ */
  // Función que se conecta al servicio y obtiene los datos de 3 productos 
  // desde supabase
  async getProductsHomeFromServer() {
    try {
      this.products = await this._productsService.getProductsHomeFromServer();
      console.log(this.products);
    } catch (err: any) {
      console.error('Error al obtener los productos:', err);
    } finally {
      this.loading = false;
    }
  }
}
