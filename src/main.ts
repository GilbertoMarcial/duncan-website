import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { LOCALE_ID } from '@angular/core';

import { routes } from './app/app.routes'; // Ajusta según tus rutas

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    // duncan.mx
    { provide: RECAPTCHA_V3_SITE_KEY, useValue: '6Ld1qz0rAAAAAInNcbGIwDDPF5B3iMMsU5rI4mpq' },
    // localhost
    // { provide: RECAPTCHA_V3_SITE_KEY, useValue: '6LdvsT0rAAAAAFQNnU34_7KCESKeOUavPuTHjlUa' },
    { provide: LOCALE_ID, useValue: 'es-MXN' }
  ]
}).catch(err => console.error(err));


// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { AppComponent } from './app/app.component';

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));
