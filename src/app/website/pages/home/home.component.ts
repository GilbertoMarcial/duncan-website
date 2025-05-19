import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { Title } from '@angular/platform-browser';

import emailjs from 'emailjs-com';

import { environment } from '../../../../environments/environment';

import { RecaptchaV3Module, ReCaptchaV3Service } from 'ng-recaptcha';

import Swal from 'sweetalert2';

// Services
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, FormsModule, RecaptchaV3Module],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  @ViewChild('products') productsSection!: ElementRef;
  @ViewChild('contactForm') contactFormSection!: ElementRef;

  products!: any;
  loading = true;
  error = '';

  form = {
    name: '',
    phone: '',
    email: '',
    message: ''
  }

  constructor(
    private _route: ActivatedRoute, 
    private _productsService: ProductsService,
    private _title: Title, 
    private _reCaptchaV3Service: ReCaptchaV3Service
  ) {}

  ngOnInit(): void {
    // Quitar comentario para conectar a supabase/json
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

  // Función que envía el correo a través del formulario
  sendEmail() {
    this._reCaptchaV3Service.execute('formularioContacto').subscribe({
      next: (token: string) => {
        const formData = {
          ...this.form,
          'g-recaptcha-response': token
        };

        // Si todo OK
        // https://dashboard.emailjs.com/
        // Revisar credenciales de duncan
        const serviceID = environment.emailjsServiceId;
        const templateId = environment.emailjsTemplateId;
        const publicKey = environment.emailjsPublicKey;

        emailjs.send(serviceID, templateId, this.form, publicKey)
          .then((response) => {
            Swal.fire({
              icon: 'success',
              title: 'Correo enviado correctamente',
              showConfirmButton: false,
              timer: 1500
            });
            this.form = { name: '', phone: '', email: '', message: '' };
          })
          .catch((error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error al enviar el correo',
              showConfirmButton: false,
              timer: 1500
            });
          });


      }, 
      error: (err) => {
        console.log('Error con reCaptcha: ', err);
        Swal.fire({
          icon: 'error',
          title: 'Error de verificación reCAPTCHA',
          showConfirmButton: false,
          timer: 1500
        })
      }
    });

  }

  /* ************ Archivo json ************ */
  // Función que se conecta al servicio y obtiene los datos de 3 productos 
  // desde un archivo json
  getProductsHome() {
    console.log('Desde JSON');
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
    } catch (err: any) {
      console.error('Error al obtener los productos:', err);
    } finally {
      this.loading = false;
    }
  }
}
