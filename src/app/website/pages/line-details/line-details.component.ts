import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { MoreInfoComponent } from '../../shared/more-info/more-info.component';

// Models
import { Line } from '../../models/line-full';
import { Category } from '../../models/category';
import { Product } from '../../models/product';

@Component({
  selector: 'app-line-details',
  imports: [CommonModule, RouterModule, MoreInfoComponent],
  templateUrl: './line-details.component.html',
  styleUrl: './line-details.component.css'
})
export class LineDetailsComponent implements OnInit {
  keyLine: string = '';
  line: Line = new Line(1, '', '', '', []);
  aboutSafe!: SafeHtml;

  constructor(
    private _route: ActivatedRoute, 
    private _sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.keyLine = params['line'];
      this.loadLine(this.keyLine);
    });
  }

  // Cargar datos de la línea a través del servicio
  loadLine(keyLine: string): Line {
    // Modificar el siguiente código para obtenerlo desde la BD
    this.line = new Line(
      1, 
      keyLine, 
      keyLine, 
      '<p class="text-dark-uai pt-3">Los sólidos equipos de diagnóstico de Doble y su software correspondiente le permiten realizar pruebas de rutina y especializadas en sus activos críticos. En realidad, las “Pruebas Doble” son el estándar de la industria. Clientes en todo el mundo usan los equipos serie <span class="font-weight-bold">M</span>, <span class="font-weight-bold">TDR</span>, <span class="font-weight-bold">SFRA</span> y <span class="font-weight-bold">Vanguard</span> para realizar pruebas de puesta en servicio, diagnóstico y mantenimiento programado. Estos analizadores de activos son la piedra angular de un riguroso programa de mantenimiento basado en las condiciones.</p>', 
      [
        new Category(1, 'interruptores', 'Prueba de interruptores', 
          [
            new Product(1, 'f8300', 'F8300', 'Equipo de prueba trifásico')
          ]
        ), 
        new Category(2, 'transformadores', 'Prueba de transformadores de potencia', 
          [
            new Product(2, 'm7100', 'M7100', 'Analizador de activos de alto voltaje'),
            new Product(3, 'm4100', 'M4100', 'Probador de aparatos de alto voltaje'),
            new Product(4, 'dta', 'Software DTA', 'Software Doble Test Assistant')
          ]
        )
      ]
    );

    // Sanitizamos el texto en html
    this.setAboutSafe(this.line.description);
    return this.line;
  }

  // Función que limpia el texto en html
  setAboutSafe(html: string) {
    this.aboutSafe = this._sanitizer.bypassSecurityTrustHtml(html);
    this.line.description = this.aboutSafe;
  }

  // Función que permite desplazarse a la sección descripción general
  scrollToDescription() {
    const element = document.getElementById('descripcion');
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

}
