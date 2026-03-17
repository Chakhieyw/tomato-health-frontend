import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Health } from '../services/health';
import { HealthResponse } from '../models/health';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';
import { forkJoin } from 'rxjs';

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


    this.autoRefreshTimer = setInterval(
      () => {
        this.loadData();
      },
      30 * 60 * 1000, // ทุก 30 นาที
    );
  }

  ngOnDestroy() {
    if (this.clockTimer) clearInterval(this.clockTimer);
    if (this.autoRefreshTimer) clearInterval(this.autoRefreshTimer);
  }

  updateDateTime() {
    const now = new Date();

    this.currentDate =
      now.getDate().toString().padStart(2, '0') +
      '/' +
      (now.getMonth() + 1).toString().padStart(2, '0') +
      '/' +
      now.getFullYear();

    this.currentTime = now.toTimeString().slice(0, 8);
  }

  // 🔥 โหลดข้อมูล (แก้แล้ว)
  loadData() {
    this.loading = true;

    forkJoin({
      image: this.healthService.getLatestImage(),
      ai: this.healthService.getLatestAIResult(),
    }).subscribe({
      next: ({ image, ai }: any) => {
        const createdAt = ai?.created_at ? new Date(ai.created_at) : new Date();

        const formattedDate = createdAt.toLocaleDateString('en-GB');
        const formattedTime = createdAt.toTimeString().slice(0, 8);

        const hasDisease =
          ai?.disease_name && ai.disease_name.toLowerCase() !== 'healthy';

        this.data = {
          image_url: image.image_url,

          // disease
          disease: ai?.disease_name ?? null,
          disease_th: null,

          // time
          last_check: formattedDate,
          time: formattedTime,
          system_status: 'ONLINE',

          // status
          status: hasDisease ? 'warning' : 'normal',
        };

        this.loading = false;
      },
      error: () => {
        console.error('โหลดข้อมูลผิดพลาด');
        this.loading = false;
      },
    });
  }

  // 🔥 ปุ่มอัปเดต
  onRefreshClick() {
    this.loadData();
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => this.router.navigate(['/login']),
    });
  }
}
