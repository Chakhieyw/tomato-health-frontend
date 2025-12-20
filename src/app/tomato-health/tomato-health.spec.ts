import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TomatoHealth } from './tomato-health';

describe('TomatoHealth', () => {
  let component: TomatoHealth;
  let fixture: ComponentFixture<TomatoHealth>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TomatoHealth]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TomatoHealth);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
