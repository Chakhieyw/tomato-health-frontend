import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HealthService } from '../services/health';

type HealthStatus = 'normal' | 'warning';

@Component({
  selector: 'app-tomato-health',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tomato-health.html',
  styleUrls: ['./tomato-health.scss'],
})
export class TomatoHealth implements OnInit {
  data: any = null;
  loading = false;
  currentStatus: HealthStatus = 'warning';

  constructor(private healthService: HealthService) {}

  ngOnInit() {
    this.loadData(this.currentStatus);
  }

  randomStatus(): HealthStatus {
    return Math.random() > 0.5 ? 'normal' : 'warning';
  }

  loadData(status?: HealthStatus) {
    this.loading = true;
    this.currentStatus = status ?? this.randomStatus();

    this.healthService.getHealthCheck(this.currentStatus).subscribe({
      next: (res) => {
        this.data = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Health API error', err);
        this.loading = false;
      },
    });
  }
}
