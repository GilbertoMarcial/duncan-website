import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, AfterViewInit, ViewChild } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @ViewChild('navbarMain') navbarMain!: ElementRef;
  @ViewChild('contactForm') contactFormSection!: ElementRef;

  constructor(
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  @HostListener('window:scroll', [])
  // Función que permite cambiar el color del navbar
  onWindowScroll() {
    const scrolled = window.scrollY > 50;
    const navbarEl = this.navbarMain.nativeElement;

    if (scrolled) {
      navbarEl.classList.add('bg-transparent', 'shadow-lg', 'navbar-blur');
      navbarEl.classList.remove('bg-white');
    } else {
      navbarEl.classList.add('bg-white');
      navbarEl.classList.remove('bg-transparent', 'shadow-lg', 'navbar-blur');
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

  // 
  isBrandsActive(): boolean {
    return this._router.url.startsWith('/brands');
  }
}
