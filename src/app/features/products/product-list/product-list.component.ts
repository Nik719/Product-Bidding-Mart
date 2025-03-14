import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product, ProductType } from '../../../core/models/product.model';
import { ProductService } from '../../../core/services/product.service';
import { AuthService } from '../../../core/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-product-list',
  template: `
    <div class="product-page">
      <div class="hero-section">
        <h1>Discover Unique Items</h1>
        <p>Browse through our curated collection of auctions, buy-now items, and donations</p>
      </div>

      <div class="filters-section">
        <mat-button-toggle-group [(ngModel)]="selectedType" class="filter-group">
          <mat-button-toggle value="all">
            <mat-icon>grid_view</mat-icon>
            All Items
          </mat-button-toggle>
          <mat-button-toggle value="bid">
            <mat-icon>gavel</mat-icon>
            Auctions
          </mat-button-toggle>
          <mat-button-toggle value="resell">
            <mat-icon>shopping_cart</mat-icon>
            Buy Now
          </mat-button-toggle>
          <mat-button-toggle value="donation">
            <mat-icon>favorite</mat-icon>
            Donations
          </mat-button-toggle>
        </mat-button-toggle-group>
      </div>

      <div class="products-grid">
        <mat-card class="product-card" *ngFor="let product of paginatedProducts">
          <div class="product-image-container">
            <img [src]="product.imageUrl" [alt]="product.title">
            <div class="product-type-badge" [ngClass]="product.type">
              {{ product.type === 'bid' ? 'Auction' : product.type === 'resell' ? 'Buy Now' : 'Donation' }}
            </div>
          </div>
          
          <mat-card-content>
            <div class="product-header">
              <h2>{{ product.title }}</h2>
              <p class="location">
                <mat-icon>location_on</mat-icon>
                {{ product.location }}
              </p>
            </div>
            
            <p class="description">{{ product.description }}</p>
            
            <div class="price-info">
              <ng-container [ngSwitch]="product.type">
                <div *ngSwitchCase="'bid'" class="bid-info">
                  <div class="price-row">
                    <span class="label">Current Bid:</span>
                    <span class="value">₹{{ product.currentBid?.toLocaleString('en-IN') }}</span>
                  </div>
                  <div class="price-row">
                    <span class="label">Base Price:</span>
                    <span class="value">₹{{ product.price.toLocaleString('en-IN') }}</span>
                  </div>
                  <div class="time-left">
                    <mat-icon>timer</mat-icon>
                    {{ getTimeLeft(product.endTime) }}
                  </div>
                </div>
                <div *ngSwitchCase="'resell'" class="price-row">
                  <span class="label">Price:</span>
                  <span class="value">₹{{ product.price.toLocaleString('en-IN') }}</span>
                </div>
                <div *ngSwitchCase="'donation'" class="donation-badge">
                  <mat-icon>favorite</mat-icon>
                  Available for Donation
                </div>
              </ng-container>
            </div>

            <div class="product-footer">
              <div class="seller-info">
                <mat-icon>store</mat-icon>
                {{ product.seller.name }}
              </div>
              <div class="condition-badge">
                {{ product.condition }}
              </div>
            </div>
          </mat-card-content>

          <mat-card-actions>
            <ng-container [ngSwitch]="product.type">
              <button *ngSwitchCase="'bid'" mat-raised-button color="primary" (click)="handleBid(product)">
                <mat-icon>gavel</mat-icon>
                Place Bid
              </button>
              <button *ngSwitchCase="'resell'" mat-raised-button color="primary" (click)="handleBuy(product)">
                <mat-icon>shopping_cart</mat-icon>
                Buy Now
              </button>
              <button *ngSwitchCase="'donation'" mat-raised-button color="accent" (click)="handleDonation(product)">
                <mat-icon>favorite</mat-icon>
                Request Item
              </button>
            </ng-container>
            <button mat-button color="primary" (click)="viewDetails(product)">
              <mat-icon>info</mat-icon>
              Details
            </button>
          </mat-card-actions>
        </mat-card>
      </div>
      <mat-paginator [length]="filteredProducts.length" [pageSize]="pageSize" (page)="onPageChange($event)">
      </mat-paginator>
    </div>
  `,
  styles: [`
    .product-page {
      padding: 2rem;
      max-width: 1400px;
      margin: 0 auto;
      background: #fafafa;
    }

    .hero-section {
      text-align: center;
      margin-bottom: 3rem;
      padding: 4rem 0;
      background: linear-gradient(135deg, #1976d2 0%, #64b5f6 100%);
      color: white;
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);

      h1 {
        font-size: 3rem;
        font-weight: 700;
        margin-bottom: 1rem;
      }

      p {
        font-size: 1.2rem;
        opacity: 0.9;
      }
    }

    .filters-section {
      margin-bottom: 2rem;
      display: flex;
      justify-content: center;
    }

    .filter-group {
      background: white;
      border-radius: 12px;
      padding: 0.5rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);

      ::ng-deep .mat-button-toggle {
        border-radius: 8px;
        margin: 0 0.25rem;
        
        .mat-button-toggle-label-content {
          padding: 0 1.5rem;
        }

        mat-icon {
          margin-right: 0.5rem;
        }
      }
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }

    .product-card {
      border-radius: 16px;
      overflow: hidden;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      background: white;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 24px rgba(0,0,0,0.1);
      }
    }

    .product-image-container {
      position: relative;
      height: 240px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;

        &:hover {
          transform: scale(1.05);
        }
      }
    }

    .product-type-badge {
      position: absolute;
      top: 1rem;
      right: 1rem;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      color: white;
      font-weight: 500;
      font-size: 0.9rem;
      backdrop-filter: blur(4px);

      &.bid {
        background: rgba(244, 67, 54, 0.9);
      }

      &.resell {
        background: rgba(33, 150, 243, 0.9);
      }

      &.donation {
        background: rgba(76, 175, 80, 0.9);
      }
    }

    .product-header {
      padding: 1.5rem 1.5rem 0.5rem;

      h2 {
        margin: 0;
        font-size: 1.25rem;
        font-weight: 600;
        color: #333;
      }

      .location {
        display: flex;
        align-items: center;
        color: #666;
        font-size: 0.9rem;
        margin-top: 0.5rem;

        mat-icon {
          font-size: 1rem;
          margin-right: 0.25rem;
        }
      }
    }

    .description {
      padding: 0 1.5rem;
      color: #666;
      margin: 0.5rem 0;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .price-info {
      padding: 1rem 1.5rem;
      background: #f8f9fa;
      margin: 1rem 1.5rem;
      border-radius: 12px;

      .price-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;

        .label {
          color: #666;
          font-size: 0.9rem;
        }

        .value {
          font-weight: 600;
          color: #1976d2;
        }
      }

      .time-left {
        display: flex;
        align-items: center;
        color: #f44336;
        font-weight: 500;
        margin-top: 0.5rem;

        mat-icon {
          font-size: 1rem;
          margin-right: 0.25rem;
        }
      }

      .donation-badge {
        display: flex;
        align-items: center;
        color: #4caf50;
        font-weight: 500;

        mat-icon {
          margin-right: 0.5rem;
        }
      }
    }

    .product-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 1.5rem 1rem;

      .seller-info {
        display: flex;
        align-items: center;
        color: #666;
        font-size: 0.9rem;

        mat-icon {
          font-size: 1rem;
          margin-right: 0.25rem;
        }
      }

      .condition-badge {
        padding: 0.25rem 0.75rem;
        border-radius: 12px;
        background: #e3f2fd;
        color: #1976d2;
        font-size: 0.8rem;
        font-weight: 500;
      }
    }

    mat-card-actions {
      padding: 0.5rem 1.5rem 1.5rem;
      display: flex;
      justify-content: space-between;
      gap: 1rem;

      button {
        flex: 1;
        border-radius: 8px;
        padding: 0.75rem;
        font-weight: 500;

        mat-icon {
          margin-right: 0.5rem;
        }
      }
    }

    @media (max-width: 768px) {
      .product-page {
        padding: 1rem;
      }

      .hero-section {
        padding: 2rem 0;

        h1 {
          font-size: 2rem;
        }
      }

      .products-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ProductListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  products: Product[] = [];
  selectedType: 'all' | ProductType = 'all';
  pageSize = 25;
  currentPage = 0;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });

    this.route.queryParams.subscribe(params => {
      const searchQuery = params['search'];
      if (searchQuery) {
        this.searchProducts(searchQuery);
      }
    });
  }

  get filteredProducts(): Product[] {
    if (this.selectedType === 'all') {
      return this.products;
    }
    return this.products.filter(product => product.type === this.selectedType);
  }

  get paginatedProducts(): Product[] {
    const startIndex = this.currentPage * this.pageSize;
    return this.filteredProducts.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
  }

  searchProducts(query: string): void {
    this.productService.searchProducts(query).subscribe(products => {
      this.products = products;
    });
  }

  getTimeLeft(endTime?: Date): string {
    if (!endTime) return '';
    
    const now = new Date();
    const timeLeft = endTime.getTime() - now.getTime();
    
    if (timeLeft <= 0) return 'Auction ended';
    
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
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

  viewDetails(product: Product): void {
    this.router.navigate(['/products/details', product.id]);
  }
}