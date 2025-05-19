import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { Title } from '@angular/platform-browser';

import { MoreInfoComponent } from '../../shared/more-info/more-info.component';

// Services
import { SoftwareService } from '../../services/software.service';

// Models
import { Software } from '../../models/software';

@Component({
  selector: 'app-software',
  imports: [CommonModule, RouterModule, MoreInfoComponent],
  templateUrl: './software.component.html',
  styleUrl: './software.component.css'
})
export class SoftwareComponent {
  keySoftware: string = '';
  software: Software = new Software(1, '', '', '', '', '', '', '', '', '', '');
  subnameSafe!: SafeHtml;
  overviewSafe!: SafeHtml;
  descriptionSafe!: SafeHtml;
  featuresSafe!: SafeHtml;
  loading = true;
  error = '';

  constructor(
    private _route: ActivatedRoute, 
    private _sanitizer: DomSanitizer,
    private _softwareService: SoftwareService, 
    private _title: Title
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.keySoftware = params['software'];
      // Obtener software desde el servicio json/supabase
      // this.getSoftwareByKey(this.keySoftware);
      this.getSoftwareByKeyFromServer(this.keySoftware);
    });
  }

  ngAfterViewInit(): void {
    // Cambiar margin top dependiendo del ancho de la pantalla
    const header = document.querySelector('.row-software');
    if (window.innerWidth < 768 && header) {
      header.classList.remove('pt-0');
      header.classList.add('pt-6');
    }

    if (window.innerWidth >= 768 && header) {
      header.classList.remove('pt-6');
      header.classList.add('pt-0');
    }

    // const row_description = document.querySelector('.row-description');
    // if (window.innerWidth < 768 && row_description) {
    //   row_description.classList.remove('my-3');
    //   row_description.classList.add('my-7');
    // }

    // if (window.innerWidth >= 768 && row_description) {
    //   row_description.classList.remove('my-7');
    //   row_description.classList.add('my-3');
    // }
  }

  // Función que permite regresar a la página anterior
  goBack() {
    window.history.back();
  }

  /* ************ Begin Archivo json ************ */
  getSoftwareByKey(key: string) {
    console.log('Desde JSON');
    this._softwareService.getSoftwareByKey(key).subscribe((data: any) => {
      this.software = data[0];

      // Sanitizamos el texto en html
      this.subnameSafe = this._sanitizer.bypassSecurityTrustHtml(this.software.subname);
      this.overviewSafe = this._sanitizer.bypassSecurityTrustHtml(this.software.overview);
      this.descriptionSafe = this._sanitizer.bypassSecurityTrustHtml(this.software.description);
      this.featuresSafe = this._sanitizer.bypassSecurityTrustHtml(this.software.features);

      // Cambiamos el título de la página
      this._title.setTitle(this.software.name + ' - Duncan Engineering');
    });
  }
  /* ************ End Archivo json ************ */

  /* ************ Begin Supabase ************ */
  // Función que se conecta al servicio para obtener los datos del software
  // de acuerdo con sy key, desde supabase
  async getSoftwareByKeyFromServer(key: string) {
    try {      
      this.software = await this._softwareService.getSoftwareByKeyFromServer(key);
      this.subnameSafe = this._sanitizer.bypassSecurityTrustHtml(this.software.subname);
      this.overviewSafe = this._sanitizer.bypassSecurityTrustHtml(this.software.overview);
      this.descriptionSafe = this._sanitizer.bypassSecurityTrustHtml(this.software.description);
      this.featuresSafe = this._sanitizer.bypassSecurityTrustHtml(this.software.features);

      // Cambiamos el título de la página
      this._title.setTitle(this.software.name + ' - Duncan Engineering');
    } catch (err: any) {
      console.error('Error al obtener el software: ', err);
    } finally {
      this.loading = false;
    }
  }
  /* ************ End Supabase ************ */

}
