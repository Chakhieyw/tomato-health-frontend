import { Routes } from '@angular/router';
import { Login } from './login/login';
import { TomatoHealth } from './tomato-health/tomato-health';
import { authGuard } from './guards/auth-guard';
import { Analyze } from './pages/analyze/analyze';
export const routes: Routes = [
  { path: 'login', component: Login },
  { path: '', component: Analyze, canActivate: [authGuard] },
  {
    path: 'old',
    component: TomatoHealth,
    canActivate: [authGuard],
  },

  { path: '**', redirectTo: '' }

];
