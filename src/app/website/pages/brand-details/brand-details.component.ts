import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { MoreInfoComponent } from '../../shared/more-info/more-info.component';

// Models
import { Brand } from '../../models/brand';
import { Line } from '../../models/line';

@Component({
  selector: 'app-brand-details',
  imports: [CommonModule, RouterModule, MoreInfoComponent],
  templateUrl: './brand-details.component.html',
  styleUrl: './brand-details.component.css'
})
export class BrandDetailsComponent implements OnInit {
  keyBrand: string = '';
  brand: Brand = new Brand(1, '', '', '', '', '', '', '', []);
  aboutSafe!: SafeHtml;

  constructor(
    private _route: ActivatedRoute, 
    private _sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.keyBrand = params['key'];
      this.loadBrand(this.keyBrand);
    });
  }

  // Cargar datos de la marca a través del servicio
  loadBrand(keyBrand: string): Brand {
    // Modificar el siguiente código para obtenerlo desde la BD
    this.brand = new Brand(
      1, 
      keyBrand, 
      keyBrand, 
      'sitio', '<p class="text-dark-uai">Fundada en 1920, <span class="font-weight-bold">Doble Engineering Company</span> asegura una energía confiable, segura y protegida para todos. Lo hace proporcionando diagnósticos completos y experiencia en ingeniería para la industria energética.</p><p class="text-dark-uai"><span class="font-weight-bold">Doble</span> forma parte del Grupo de Soluciones de Empresas de Servicios Públicos de ESCO Technologies Inc. (NYSE: ESE) y sirve a clientes de todo el mundo.</p>', 
      'color1', 
      'color2', 
      'image', 
      [
        new Line(1, 'instrumentos', 'Instrumentos de prueba eléctricos', 'Software de diagnóstico y analizadores para pruebas de estado de condición y operación de aparatos de subestaciones.'),
        new Line(2, 'pruebas', 'Pruebas de protección', 'Realice pruebas, gestione datos y genere informes con el software y los equipos de diagnóstico para pruebas de todos los tipos de esquemas y relés de protección.')
      ]
    );

    // Sanitizamos el texto en html
    this.setAboutSafe(this.brand.about);
    return this.brand;
  }

  // Función que limpia el texto en html
  setAboutSafe(html: string) {
    this.aboutSafe = this._sanitizer.bypassSecurityTrustHtml(html);
    this.brand.about = this.aboutSafe;
  }

  // Función que permite desplazarse a la sección about
  scrollToAbout() {
    const element = document.getElementById('acerca');
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }
}
