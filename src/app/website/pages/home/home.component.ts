import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

// Services

// Models
import { Product } from '../../models/product';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  @ViewChild('products') productsSection!: ElementRef;
  @ViewChild('contactForm') contactFormSection!: ElementRef;

  products: Product[] = [];

  ngOnInit(): void {
    // Se cargan los tres productos a mostrar en el home
    this.products = [
      new Product(1, 'm4100', 'M4100', 'Analizador de aparatos de alto voltaje', '', '', '', '', ''),
      new Product(2, 'm7100', 'M7100', 'Analizador de activos de alto voltaje', '', '', '', '', ''),
      new Product(3, 'f8300', 'F8300', 'Equipo de prueba trifásico', '', '', '', '', '')
    ];
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
}
