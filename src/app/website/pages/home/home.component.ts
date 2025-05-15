import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { Title } from '@angular/platform-browser';

// Services
import { ProductsService } from '../../services/products.service';

// Models
// import { Product } from '../../models/product';

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

  constructor(
    private _route: ActivatedRoute, 
    private _productsService: ProductsService,
    private _title: Title
  ) {}

  ngOnInit(): void {
    this.getProductsHome();
    this._title.setTitle('Duncan Engineering Company');
  }

  ngAfterViewInit(): void {
    this._route.fragment.subscribe(fragment => {
      if (fragment) {
        setTimeout(() => {
          this.scrollToContact();
        }, 100); // espera a que se renderice el DOM
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

  // Función que se conecta al servicio para obtener los productos de Home
  getProductsHome() {
    this._productsService.getProductsHome().subscribe(products => {
      this.products = products;
    });
  }
}
