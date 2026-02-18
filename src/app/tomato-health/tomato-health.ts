import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class TomatoHealth implements OnInit, OnDestroy {
  data: (HealthResponse & { status: 'normal' | 'warning' }) | null = null;

  loading = false;
  currentTime = '';
  currentDate = '';

  private clockTimer: any;
  private autoRefreshTimer: any;

  constructor(
    private healthService: Health,
    private authService: Auth,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadData();

    // ⏰ real-time clock
    this.updateDateTime();
    this.clockTimer = setInterval(() => {
      this.updateDateTime();
    }, 1000);

    // 🔄 auto refresh every 30 minutes
    this.autoRefreshTimer = setInterval(
      () => {
        this.loadData();
      },
      30 * 60 * 1000,
    );
  }

  ngOnDestroy() {
    if (this.clockTimer) clearInterval(this.clockTimer);
    if (this.autoRefreshTimer) clearInterval(this.autoRefreshTimer);
  }

  updateDateTime() {
    const now = new Date();

    // ✅ DD/MM/YYYY
    this.currentDate =
      now.getDate().toString().padStart(2, '0') +
      '/' +
      (now.getMonth() + 1).toString().padStart(2, '0') +
      '/' +
      now.getFullYear();

    this.currentTime = now.toTimeString().slice(0, 8);
  }

  loadData() {
    this.loading = true;

    this.healthService.getLatestImage().subscribe({
      next: (imageRes: any) => {
        this.healthService.getLatestAIResult().subscribe({
          next: (aiRes: any) => {
            const createdAt = aiRes?.created_at
              ? new Date(aiRes.created_at)
              : new Date();

            const formattedDate = createdAt.toLocaleDateString('en-GB'); // DD/MM/YYYY
            const formattedTime = createdAt.toTimeString().slice(0, 8);

            // 🔥 logic ตรวจ Healthy
            const hasDisease =
              aiRes?.disease_name &&
              aiRes.disease_name.toLowerCase() !== 'healthy';

            this.data = {
              image_url: imageRes.image_url,

              // disease
              disease: aiRes?.disease_name ?? null,
              disease_th: null,

              // time
              last_check: formattedDate,
              time: formattedTime,
              system_status: 'ONLINE',

              // 🔥 status logic
              status: hasDisease ? 'warning' : 'normal',
            };

            this.loading = false;
          },
          error: () => {
            console.error('AI result error');
            this.loading = false;
          },
        });
      },
      error: () => {
        console.error('Image API error');
        this.loading = false;
      },
    });
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => this.router.navigate(['/login']),
    });
  }
}
