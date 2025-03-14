import { Component } from '@angular/core';

@Component({
  selector: 'app-favorites',
  template: `
    <div class="container">
      <h1>Favorites</h1>
      <mat-card>
        <mat-card-content>
          <p>Your favorite items coming soon...</p>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class FavoritesComponent { }