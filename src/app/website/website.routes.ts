import { RouterModule, Routes } from "@angular/router";

// Components
import { WebsiteComponent } from "./website.component";
import { HomeComponent } from "./pages/home/home.component";
import { BrandsComponent } from "./pages/brands/brands.component";
import { BrandDetailsComponent } from "./pages/brand-details/brand-details.component";

const websiteRoutes: Routes = [
  {
    path: '', 
    component: WebsiteComponent, 
    children: [
      { path: 'home', component: HomeComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }, 
      { path: 'brands', component: BrandsComponent },
      { path: 'brands/:key', component: BrandDetailsComponent },
    ]
  }
];

export const WEBSITE_ROUTES = RouterModule.forChild(websiteRoutes);