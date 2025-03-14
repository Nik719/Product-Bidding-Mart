import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="container">
      <h1>Dashboard</h1>
      <div class="search-sort">
        <mat-form-field appearance="outline">
          <mat-label>Search</mat-label>
          <input matInput (input)="onSearch($event)" placeholder="Search...">
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Sort By</mat-label>
          <mat-select (selectionChange)="onSort($event.value)">
            <mat-option value="bids">Bids</mat-option>
            <mat-option value="listings">Listings</mat-option>
            <mat-option value="transactions">Transactions</mat-option>
          </mat-select>
        </mat-form-field>
      </div>
      <div class="dashboard-grid">
        <mat-card>
          <mat-card-header>
            <mat-icon mat-card-avatar>shopping_cart</mat-icon>
            <mat-card-title>My Bids</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>Active Bids: 3</p>
            <p>Won Auctions: 5</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button color="primary">View All</button>
          </mat-card-actions>
        </mat-card>

        <mat-card>
          <mat-card-header>
            <mat-icon mat-card-avatar>store</mat-icon>
            <mat-card-title>My Listings</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>Active Listings: 2</p>
            <p>Sold Items: 8</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button color="primary">View All</button>
          </mat-card-actions>
        </mat-card>

        <mat-card>
          <mat-card-header>
            <mat-icon mat-card-avatar>account_balance_wallet</mat-icon>
            <mat-card-title>Transactions</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>Total Spent: $1,200</p>
            <p>Total Earned: $3,500</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button color="primary">View All</button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }
    mat-card {
      height: 100%;
    }
    mat-card-content {
      margin-top: 1rem;
    }
    .search-sort {
      display: flex;
      justify-content: space-between;
      margin-bottom: 2rem;
    }
    mat-form-field {
      width: 45%;
    }
  `]
})
export class DashboardComponent {
  constructor(private authService: AuthService) {}

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement | null;
    if (input) {
      const query = input.value;
      console.log('Search query:', query);
      // Implement search logic here
    }
  }

  onSort(criteria: string) {
    console.log('Sort criteria:', criteria);
    // Implement sort logic here
  }
}