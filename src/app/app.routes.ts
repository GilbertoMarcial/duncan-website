import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadChildren: () => import('./website/website.module').then(m => m.WebsiteModule) },
];

export const APP_ROUTES = RouterModule.forRoot(routes, { useHash: true, preloadingStrategy: PreloadAllModules});
