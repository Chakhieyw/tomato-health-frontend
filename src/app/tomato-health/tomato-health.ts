import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Health } from '../services/health';
import { HealthResponse } from '../models/health';

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

  constructor(private healthService: Health) {}

  ngOnInit() {
    this.loadData();
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
}
