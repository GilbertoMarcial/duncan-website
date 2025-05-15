import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { Title } from '@angular/platform-browser';

import { MoreInfoComponent } from '../../shared/more-info/more-info.component';

// Services
import { BrandsService } from '../../services/brands.service';

// Models
import { Brand } from '../../models/brand';

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
  loading = true;
  error = '';

  constructor(
    private _route: ActivatedRoute, 
    private _router: Router,
    private _sanitizer: DomSanitizer,
    private _brandsService: BrandsService,
    private _title: Title
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.keyBrand = params['key'];
      this.getBrandByKey(this.keyBrand);
      // Modificar para conectar a supabase
      // this.getBrandByKeyForServer(this.keyBrand);
    });
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

  goBack() {
    this._router.navigate(['/brands']);
  }

  // Función que se conecta al servicio para obtener los datos de la marca de acuerdo con su key
  getBrandByKey(key: string) {
    this._brandsService.getBrandsByKey(key).subscribe(brand => {
      this.brand = brand[0];

      // Sanitizamos el texto en html
      this.setAboutSafe(this.brand.about);

      // Cambiamos el título de la página
      this._title.setTitle(this.brand.name + ' - Duncan Engineering Company');
    });
  }

  async getBrandByKeyForServer(key: string) {
    try {
      this.brand = await this._brandsService.getBrandByKey(key);
      console.log(this.brand);
    } catch (err: any) {
      console.error('Error al obtener la marca:', err);
    } finally {
      this.loading = false;
    }
  }
}
