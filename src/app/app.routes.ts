import { Routes } from '@angular/router';
import { Login } from './login/login';
import { TomatoHealth } from './tomato-health/tomato-health';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: 'login', component: Login },
  {
    path: '',
    component: TomatoHealth,
    canActivate: [authGuard],
  },
];
