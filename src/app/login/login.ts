import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login {
  username = '';
  password = '';
  error = '';
  loading = false;
  showPassword = false;

  constructor(
    private authService: Auth,
    private router: Router,
  ) {}

  login() {
    this.error = '';
    this.loading = true;

    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate(['/analyze']);
      },
      error: () => {
        this.error = 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง';
        this.loading = false;
      },
    });
  }
}
