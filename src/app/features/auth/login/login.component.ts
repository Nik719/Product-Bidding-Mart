import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <div class="logo-container">
            <mat-icon class="logo-icon">gavel</mat-icon>
            <h1>BIDMARKET</h1>
          </div>
          <p class="welcome-text">Welcome back! Please login to your account.</p>
        </div>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="auth-form">
          <div class="form-group">
            <mat-form-field appearance="outline">
              <mat-label>Email</mat-label>
              <mat-icon matPrefix>email</mat-icon>
              <input matInput formControlName="email" type="email" placeholder="Enter your email">
              <mat-error *ngIf="loginForm.get('email')?.hasError('required')">
                Email is required
              </mat-error>
              <mat-error *ngIf="loginForm.get('email')?.hasError('email')">
                Please enter a valid email
              </mat-error>
            </mat-form-field>
          </div>

          <div class="form-group">
            <mat-form-field appearance="outline">
              <mat-label>Password</mat-label>
              <mat-icon matPrefix>lock</mat-icon>
              <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="password">
              <button mat-icon-button matSuffix (click)="hidePassword = !hidePassword" type="button">
                <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>
              <mat-error *ngIf="loginForm.get('password')?.hasError('required')">
                Password is required
              </mat-error>
            </mat-form-field>
          </div>

          <div class="form-options">
            <mat-checkbox color="primary" formControlName="rememberMe">
              Remember me
            </mat-checkbox>
            <a href="#" class="forgot-password">Forgot Password?</a>
          </div>

          <button mat-raised-button color="primary" type="submit" [disabled]="loginForm.invalid || isLoading">
            <mat-icon>login</mat-icon>
            {{ isLoading ? 'Logging in...' : 'Login' }}
          </button>

          <div class="social-login">
            <p>Or login with</p>
            <div class="social-buttons">
              <button mat-stroked-button type="button" class="google-btn">
                <mat-icon>google</mat-icon>
                Google
              </button>
              <button mat-stroked-button type="button" class="facebook-btn">
                <mat-icon>facebook</mat-icon>
                Facebook
              </button>
            </div>
          </div>

          <div class="auth-footer">
            <p>Don't have an account? <a routerLink="/auth/register">Sign up</a></p>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      padding: 2rem;
    }

    .auth-card {
      background: white;
      border-radius: 24px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 480px;
      padding: 3rem 2rem;
    }

    .auth-header {
      text-align: center;
      margin-bottom: 2rem;

      .logo-container {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1rem;

        .logo-icon {
          font-size: 2.5rem;
          width: 2.5rem;
          height: 2.5rem;
          color: #1976d2;
          margin-right: 0.5rem;
        }

        h1 {
          font-size: 2rem;
          font-weight: 700;
          color: #333;
          margin: 0;
        }
      }

      .welcome-text {
        color: #666;
        font-size: 1.1rem;
        margin: 0;
      }
    }

    .auth-form {
      .form-group {
        margin-bottom: 1.5rem;

        mat-form-field {
          width: 100%;
        }
      }

      .form-options {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;

        .forgot-password {
          color: #1976d2;
          text-decoration: none;
          font-size: 0.9rem;

          &:hover {
            text-decoration: underline;
          }
        }
      }

      button[type="submit"] {
        width: 100%;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 12px;
        margin-bottom: 1.5rem;

        mat-icon {
          margin-right: 0.5rem;
        }
      }
    }

    .social-login {
      text-align: center;
      margin-bottom: 2rem;

      p {
        color: #666;
        margin-bottom: 1rem;
        position: relative;

        &::before,
        &::after {
          content: '';
          position: absolute;
          top: 50%;
          width: 45%;
          height: 1px;
          background: #ddd;
        }

        &::before {
          left: 0;
        }

        &::after {
          right: 0;
        }
      }

      .social-buttons {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;

        button {
          padding: 0.75rem;
          border-radius: 8px;
          font-weight: 500;

          mat-icon {
            margin-right: 0.5rem;
          }
        }

        .google-btn {
          border-color: #ddd;
          color: #333;
        }

        .facebook-btn {
          border-color: #1877f2;
          color: #1877f2;
        }
      }
    }

    .auth-footer {
      text-align: center;
      color: #666;

      a {
        color: #1976d2;
        text-decoration: none;
        font-weight: 500;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    @media (max-width: 480px) {
      .auth-container {
        padding: 1rem;
      }

      .auth-card {
        padding: 2rem 1.5rem;
      }

      .social-buttons {
        grid-template-columns: 1fr !important;
      }
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
          this.snackBar.open('Login successful!', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        },
        error: (error) => {
          this.snackBar.open(error.message || 'Login failed', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }
}