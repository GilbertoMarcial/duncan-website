import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, AfterViewInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';

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

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('window:scroll', [])
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
