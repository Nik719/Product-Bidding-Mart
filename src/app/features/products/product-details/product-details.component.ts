import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models/product.model';
import { AuthService } from '../../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-details',
  template: `
    <div *ngIf="product" class="product-details">
      <mat-card>
        <img mat-card-image [src]="product.imageUrl" [alt]="product.title">
        <mat-card-title>{{ product.title }}</mat-card-title>
        <mat-card-subtitle>{{ product.location }}</mat-card-subtitle>
        <mat-card-content>
          <p>{{ product.description }}</p>
          <p *ngIf="product.type === 'bid'">Current Bid: ₹{{ product.currentBid?.toLocaleString('en-IN') }}</p>
          <p *ngIf="product.type !== 'donation'">Price: ₹{{ product.price.toLocaleString('en-IN') }}</p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary" *ngIf="product.type === 'bid'" (click)="handleBid(product)">Place Bid</button>
          <button mat-raised-button color="primary" *ngIf="product.type === 'resell'" (click)="handleBuy(product)">Buy Now</button>
          <button mat-raised-button color="accent" *ngIf="product.type === 'donation'" (click)="handleDonation(product)">Request Item</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .product-details {
      max-width: 800px;
      margin: 2rem auto;
      padding: 1rem;
    }
  `]
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProduct(productId).subscribe(product => {
        this.product = product;
      });
    }
  }

  private checkAuthAndRedirect(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.snackBar.open('Please login to continue', 'Login', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      }).onAction().subscribe(() => {
        this.router.navigate(['/auth/login']);
      });
      return false;
    }
    return true;
  }

  handleBid(product: Product): void {
    if (this.checkAuthAndRedirect()) {
      // Handle bid logic here
      console.log('Placing bid on:', product);
    }
  }

  handleBuy(product: Product): void {
    if (this.checkAuthAndRedirect()) {
      // Handle buy logic here
      console.log('Buying product:', product);
    }
  }

  handleDonation(product: Product): void {
    if (this.checkAuthAndRedirect()) {
      // Handle donation request logic here
      console.log('Requesting donation:', product);
    }
  }
}
