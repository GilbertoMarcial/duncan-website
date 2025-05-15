import { registerLocaleData } from "@angular/common";

import localEs from '@angular/common/locales/es';
import { LOCALE_ID, NgModule } from "@angular/core";

import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { APP_ROUTES, routes } from "./app.routes";
import { WebsiteModule } from "./website/website.module";
import { RouterModule } from "@angular/router";

registerLocaleData(localEs, 'es');

@NgModule({
  declarations: [],
  imports: [
    BrowserModule, 
    FormsModule, 

    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      scrollOffset: [0, 100]
    }),
    
    APP_ROUTES, 
    
    WebsiteModule
  ],  providers: [{ provide: LOCALE_ID, useValue: 'es-MXN' }],
  bootstrap: [],
})

export class AppModule { }

