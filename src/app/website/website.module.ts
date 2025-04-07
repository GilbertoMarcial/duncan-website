import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Routes
import { WEBSITE_ROUTES } from './website.routes';

// Components
import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './shared/header/header.component';


@NgModule({
  declarations: [],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule, 
    ReactiveFormsModule, 

    WEBSITE_ROUTES, 
    SharedModule, 
    HeaderComponent
  ]
})
export class WebsiteModule { }
