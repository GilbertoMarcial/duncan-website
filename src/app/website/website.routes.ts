import { RouterModule, Routes } from "@angular/router";
import { WebsiteComponent } from "./website.component";
import { HomeComponent } from "./pages/home/home.component";

const websiteRoutes: Routes = [
  {
    path: '', 
    component: WebsiteComponent, 
    children: [
      { path: 'home', component: HomeComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];

export const WEBSITE_ROUTES = RouterModule.forChild(websiteRoutes);