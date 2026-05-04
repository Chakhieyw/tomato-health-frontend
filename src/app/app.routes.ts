import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login').then((m) => m.Login),
  },
  {
    path: 'analyze',
    loadComponent: () =>
      import('./pages/analyze/analyze').then((m) => m.Analyze),
    canActivate: [authGuard],
  },
  {
    path: '',
    redirectTo: 'analyze',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'analyze',
  },
];