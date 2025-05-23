import { RouterModule, Routes } from "@angular/router";

// Components
import { WebsiteComponent } from "./website.component";
import { HomeComponent } from "./pages/home/home.component";
import { BrandsComponent } from "./pages/brands/brands.component";
import { BrandDetailsComponent } from "./pages/brand-details/brand-details.component";
import { LineDetailsComponent } from "./pages/line-details/line-details.component";
import { ProductsComponent } from "./pages/products/products.component";
import { SoftwareComponent } from "./pages/software/software.component";

const websiteRoutes: Routes = [
  {
    path: '', 
    component: WebsiteComponent, 
    children: [
      { path: 'home', component: HomeComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }, 
      { path: 'brands', component: BrandsComponent },
      { path: 'brands/software/:software', component: SoftwareComponent },
      { path: 'brands/:key', component: BrandDetailsComponent },
      { path: 'brands/:key/:line', component: LineDetailsComponent },
      { path: 'brands/:key/:line/:product', component: ProductsComponent },
    ]
  }
];

export const WEBSITE_ROUTES = RouterModule.forChild(websiteRoutes);