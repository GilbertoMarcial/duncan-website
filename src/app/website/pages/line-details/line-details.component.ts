import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { Title } from '@angular/platform-browser';

import { MoreInfoComponent } from '../../shared/more-info/more-info.component';

// Services
import { LinesService } from '../../services/lines.service';

// Models
import { LineBrand } from '../../models/line-full';
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
  line: LineBrand = new LineBrand(1, '', '', '', []);
  aboutSafe!: SafeHtml;
  loading = true;
  error = '';

  constructor(
    private _route: ActivatedRoute, 
    private _sanitizer: DomSanitizer, 
    private _linesService: LinesService,
    private _title: Title
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.keyLine = params['line'];
      // Modificar para conectar a supabase/json
      this.getLineByKey(this.keyLine);
      // this.getLineByKeyFromServer(this.keyLine);
    });
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

  // Función que permite regresar a la página anterior
  goBack() {
    window.history.back();
  }

  /* ************ Begin Archivo json ************ */
  // Función que se conecta al servicio para obtener los datos de la línea 
  // (perteneciente a una marca) de acuerdo con su key desde un archivo json
  getLineByKey(key: string) {
    console.log('Desde JSON');
    this._linesService.getLinesByKey(key).subscribe(line => {
      this.line = line[0];
      
      // Sanitizamos el texto en html
      this.setAboutSafe(this.line.description);

      // Cambiamos el título de la página
      this._title.setTitle(this.line.name + ' - Duncan Engineering');
    });
  }
  /* ************ End Archivo json ************ */

  /* ************ Begin Supabase ************ */
  // Función que se conecta al servicio para obtener los datos de la línea 
  // (perteneciente a una marca) de acuerdo con su key desde supabase
  async getLineByKeyFromServer(key: string) {
    try {
      this.line = await this._linesService.getLinesByKeyFromServer(key);

      // Sanitizamos el texto en html
      this.setAboutSafe(this.line.description);

      // Cambiamos el título de la página
      this._title.setTitle(this.line.name + ' - Duncan Engineering');

    } catch (err: any) {
      console.error('Error al obtener la línea: ', err);
    } finally {
      this.loading = false;
    }
  }
  /* ************ End Supabase ************ */
}
