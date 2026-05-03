import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Health } from '../../services/health';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

const AUTO_REFRESH_MS = 30 * 60 * 1000; // 30 นาที

@Component({
  selector: 'app-analyze',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './analyze.html',
  styleUrls: ['./analyze.scss'],
})
export class Analyze implements OnInit, OnDestroy {
  imageUrl: string | null = null;
  result: any;
  loading = true;

  date = '';
  time = '';
  scanTime = '-';

  nextRefreshIn = '';
  private autoRefreshTimer: any;
  private countdownTimer: any;
  private nextRefreshAt = 0;

  constructor(
    private api: Health,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.scheduleAutoRefresh();
    this.startCountdown();
  }

  ngOnDestroy(): void {
    clearTimeout(this.autoRefreshTimer);
    clearInterval(this.countdownTimer);
  }

  manualRefresh(): void {
    clearTimeout(this.autoRefreshTimer);
    this.loadData();
    this.scheduleAutoRefresh();
  }

  logout(): void {
    clearTimeout(this.autoRefreshTimer);
    clearInterval(this.countdownTimer);
    localStorage.removeItem('token'); // ลบ token ถ้ามี
    this.router.navigate(['/login']);
  }

  private scheduleAutoRefresh(): void {
    this.nextRefreshAt = Date.now() + AUTO_REFRESH_MS;
    clearTimeout(this.autoRefreshTimer);
    this.autoRefreshTimer = setTimeout(() => {
      this.loadData();
      this.scheduleAutoRefresh();
    }, AUTO_REFRESH_MS);
  }

  private startCountdown(): void {
    this.countdownTimer = setInterval(() => {
      const remaining = Math.max(0, this.nextRefreshAt - Date.now());
      const m = Math.floor(remaining / 60000);
      const s = Math.floor((remaining % 60000) / 1000);
      this.nextRefreshIn = `${m}:${s.toString().padStart(2, '0')}`;
    }, 1000);
  }

  loadData(): void {
    const start = Date.now();
    this.loading = true;

    this.api.getLatestImage().subscribe({
      next: (img: any) => {
        this.imageUrl = img?.image_url ?? null;
      },
    });

    this.api.getLatestAIResult().subscribe({
      next: (res: any) => {
        this.result = res;

        const createdAt = res?.created_at
          ? new Date(res.created_at)
          : new Date();
        this.date = createdAt.toLocaleDateString();
        this.time = createdAt.toLocaleTimeString();

        this.scanTime = Date.now() - start + ' ms';
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
