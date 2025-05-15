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

  constructor(
    private _route: ActivatedRoute, 
    private _sanitizer: DomSanitizer, 
    private _productsService: ProductsService, 
    private _title: Title
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.keyProduct = params['product'];
      // this.loadProduct(this.keyProduct);
      this.getProductByKey(this.keyProduct);
    });
  }

  // Función que permite regresar a la página anterior
  goBack() {
    window.history.back();
  }

  // Cargar datos del producto a través del servicio
  loadProduct(keyProduct: string): ProductFull {
    // Modificar el siguiente código para obtenerlo desde la BD
    this.product = new ProductFull(
      1, 
      keyProduct,
      keyProduct, 
      'Probador de aparatos de alto voltaje', 
      '<p class="text-dark-uai pt-3">El instrumento M4100 es el estándar industrial para pruebas de aislamiento y aparatos de potencia. Su combinación exclusiva de software de análisis de inteligencia artificial y capacidades de prueba lo convierte en el instrumento de factor de potencia/Tan-Delta más confiable de la industria de potencia eléctrica.</p><p class="text-dark-uai">Los instrumentos M4100 se usan en todo el mundo gracias a sus completas opciones de prueba, características de seguridad y precisión de medición.</p><p class="text-dark-uai">Las pruebas son simples y precisas con el instrumento M4100 y el software Doble Test Assistant (DTA). Luego puede analizar los resultados de pruebas con la ayuda de sistema FRANK™, Base de Conocimientos para Análisis de Primera Respuesta, que proporciona recomendaciones y explicaciones claras.</p>', 
      '<ul class="text-dark-uai"><li class="mt-2">Pruebas Tan Delta/factor de potencia para confirmar la calidad e integridad del aislamiento.</li><li class="mt-2">Pruebas de capacitancia para medir los cambios físicos que pueden haber ocurrido en el aparato.</li><li class="mt-2">Prueba de relaciones de transformación para detectar espiras cortocircuitadas o daños de bobinado.</li><li class="mt-2">Pruebas de reactancia de fugas/impedancia de cortocircuitos para evaluar la deformación del bobinado.</li><li class="mt-2">Pruebas de corriente de excitación monofásica para evaluar el circuito de magnetización del transformador.</li><li class="mt-2">Pruebas de baterías de capacitores para detectar los capacitores con falla o en deterioro dentro de una batería.</li><li class="mt-2">Pruebas fáciles y precisas con el software Doble Test Assistant (DTA).</li></ul>', 
      '<ul class="text-dark-uai"><li class="mt-2">La seguridad es nuestra prioridad con interruptores de seguridad, luces estroboscópicas de potencia e interbloqueos de relé de conexión a tierra.</li><li class="mt-2">Elimina el efecto de la variación de la interferencia electrostática con la modulación de la frecuencia de la línea patentada, que hace mediciones a una frecuencia por encima y por debajo de la frecuencia del sistema.</li><li class="mt-2">Confiabilidad y precisión: Genera su propia señal de prueba limpia mediante el uso de un generador de forma de onda interna para resultados confiables y lecturas estables.</li><li class="mt-2">El sistema de firmware del software detecta un funcionamiento anormal de la corriente, la temperatura y el voltaje incluso antes de que el usuario lo note.</li><li class="mt-2">Analice instantáneamente los resultados de pruebas y proporcione recomendaciones y explicaciones claras con el sistema FRANK™, First Response Analytics Knowledgebase (por sus siglas en inglés).</li></ul>', 
      '<ul class="text-dark-uai"><li class="mt-2">Laptop Dell de uso rudo</li><li class="mt-2">M4110 Leakage Reactance Interface</li><li class="mt-2">M4140 Capacitor Bank Test Kit</li><li class="mt-2">M4151 Field Calibration Reference</li><li class="mt-2">Type C Resonating Inductor</li><li class="mt-2">M4300 Transport</li><li class="mt-2">Doble Test Assistant (DTA) Software</li><li class="mt-2">dobleTTR Capacitor</li><li class="mt-2">M4100 Transport</li></ul>', 
      [
        new Product(1, 'm4100', 'M4100', 'Probador de aparatos de alto voltaje', 'doble', 'transformadores'),
        new Product(2, 'm7100', 'M7100', 'Analizador de activos de alto voltaje', 'doble', 'transformadores'),
        new Product(3, 'dta', 'Software DTA', 'Software Doble Test Assistant', 'doble', 'transformadores')
      ],
      'https://www.doble.com/product/m4100/?lang=es'
    );

    return this.product;
  }

  // Función que se conecta al servicio para obtener los datos del producto
  // de acuerdo con su key
  getProductByKey(key: string) {
    this._productsService.getProductByKey(key).subscribe((data: any) => {
      this.product = data[0];

      // Sanitizamos el texto en html
      this.aboutSafe = this._sanitizer.bypassSecurityTrustHtml(this.product.description);
  
      // Cambiamos el título de la página
      this._title.setTitle(this.product.name + ' - Duncan Engineering');
    });
  }
  
}
