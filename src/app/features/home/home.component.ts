import { Component } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-home',
  template: `
    <div class="container">
      <mat-card class="welcome-card" [@fadeIn]>
        <mat-card-header>
          <mat-card-title>Welcome to Product Bidding Mart</mat-card-title>
          <mat-card-subtitle>Your marketplace for sustainable shopping and surplus goods</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p>Join our community of conscious consumers and sellers making a difference.</p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary" routerLink="/products" class="browse-products-btn">Browse Products</button>
          <button mat-raised-button color="accent" routerLink="/auth/register">Get Started</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    .welcome-card {
      margin-bottom: 2rem;
      padding: 2rem;
    }
    mat-card-actions {
      display: flex;
      gap: 1rem;
      padding: 1rem !important;
    }

    ::ng-deep .browse-products-btn {
      background: linear-gradient(135deg, #1976d2 0%, #64b5f6 100%);
      color: white;
      
      &:hover {
        background: linear-gradient(135deg, #1565c0 0%, #42a5f5 100%);
      }
    }
  `],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.3s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class HomeComponent {}