import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Health } from '../services/health';
import { HealthResponse } from '../models/health';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-tomato-health',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tomato-health.html',
  styleUrls: ['./tomato-health.scss'],
})
export class TomatoHealth implements OnInit {
  data: (HealthResponse & { status: 'normal' | 'warning' }) | null = null;
  loading = false;
  currentTime = '';
  currentDate = '';
  private timer: any;

  constructor(
    private healthService: Health,
    private authService: Auth,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadData();

    this.updateDateTime();
    setInterval(() => {
      this.updateDateTime();
    }, 1000);
  }

  updateDateTime() {
    const now = new Date();
    this.currentTime = now.toTimeString().slice(0, 8); // HH:mm:ss
    this.currentDate = now.toISOString().split('T')[0]; // YYYY-MM-DD
  }
  ngOnDestroy() {
    clearInterval(this.timer);
  }

  loadData() {
    this.loading = true;

    this.healthService.getLatestImage().subscribe({
      next: (res: any) => {
        console.log('API RESPONSE =', res);
        console.log('IMAGE URL =', res.image_url);

        const createdAt = res.created_at
          ? new Date(res.created_at)
          : new Date();

        this.data = {
          image_url: res.image_url,
          last_check: createdAt.toISOString().split('T')[0],
          time: createdAt.toTimeString().slice(0, 8),
          system_status: 'ONLINE',
          disease: null,
          disease_th: null,
          status: 'normal',
        };
      },
    });
  }
  logout() {
  this.authService.logout().subscribe({
    next: () => {
      this.router.navigate(['/login']);
    },
    error: () => {
      // fallback
      this.router.navigate(['/login']);
    },
  });
}

}
