import { registerLocaleData } from "@angular/common";
import { HttpClient } from "@angular/common/http";

import localEs from '@angular/common/locales/es';
import { LOCALE_ID, NgModule } from "@angular/core";

import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { APP_ROUTES } from "./app.routes";
import { WebsiteModule } from "./website/website.module";

registerLocaleData(localEs, 'es');

@NgModule({
  declarations: [],
  imports: [
    BrowserModule, 
    FormsModule, 
    
    APP_ROUTES, 
    
    WebsiteModule
  ],  providers: [{ provide: LOCALE_ID, useValue: 'es-MXN' }],
  bootstrap: [],
})

export class AppModule { }

