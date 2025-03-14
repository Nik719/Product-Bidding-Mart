import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <div class="logo-container">
            <mat-icon class="logo-icon">gavel</mat-icon>
            <h1>BIDMARKET</h1>
          </div>
          <p class="welcome-text">Create your account and start bidding today!</p>
        </div>

        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="auth-form">
          <div class="form-row">
            <div class="form-group">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>First Name</mat-label>
                <mat-icon matPrefix>person</mat-icon>
                <input matInput formControlName="firstName" placeholder="Enter your first name">
                <mat-error *ngIf="registerForm.get('firstName')?.hasError('required')">
                  First name is required
                </mat-error>
              </mat-form-field>
            </div>

            <div class="form-group">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Last Name</mat-label>
                <mat-icon matPrefix>person</mat-icon>
                <input matInput formControlName="lastName" placeholder="Enter your last name">
                <mat-error *ngIf="registerForm.get('lastName')?.hasError('required')">
                  Last name is required
                </mat-error>
              </mat-form-field>
            </div>
          </div>

          <div class="form-group">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Email</mat-label>
              <mat-icon matPrefix>email</mat-icon>
              <input matInput formControlName="email" type="email" placeholder="Enter your email">
              <mat-error *ngIf="registerForm.get('email')?.hasError('required')">
                Email is required
              </mat-error>
              <mat-error *ngIf="registerForm.get('email')?.hasError('email')">
                Please enter a valid email
              </mat-error>
            </mat-form-field>
          </div>

          <div class="form-group">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Password</mat-label>
              <mat-icon matPrefix>lock</mat-icon>
              <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="password">
              <button mat-icon-button matSuffix (click)="hidePassword = !hidePassword" type="button">
                <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>
              <mat-error *ngIf="registerForm.get('password')?.hasError('required')">
                Password is required
              </mat-error>
              <mat-error *ngIf="registerForm.get('password')?.hasError('minlength')">
                Password must be at least 8 characters
              </mat-error>
            </mat-form-field>
          </div>

          <div class="form-group">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Confirm Password</mat-label>
              <mat-icon matPrefix>lock</mat-icon>
              <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="confirmPassword">
              <mat-error *ngIf="registerForm.get('confirmPassword')?.hasError('required')">
                Please confirm your password
              </mat-error>
              <mat-error *ngIf="registerForm.get('confirmPassword')?.hasError('passwordMismatch')">
                Passwords do not match
              </mat-error>
            </mat-form-field>
          </div>

          <div class="form-group">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Role</mat-label>
              <mat-icon matPrefix>account_circle</mat-icon>
              <mat-select formControlName="role">
                <mat-option value="buyer">Buyer</mat-option>
                <mat-option value="seller">Seller</mat-option>
              </mat-select>
              <mat-error *ngIf="registerForm.get('role')?.hasError('required')">
                Please select a role
              </mat-error>
            </mat-form-field>
          </div>

          <div class="form-options">
            <mat-checkbox color="primary" formControlName="terms">
              I agree to the <a href="#" class="terms-link">Terms of Service</a> and <a href="#" class="terms-link">Privacy Policy</a>
            </mat-checkbox>
          </div>

          <button mat-raised-button color="primary" type="submit" [disabled]="registerForm.invalid || isLoading">
            <mat-icon>person_add</mat-icon>
            {{ isLoading ? 'Creating Account...' : 'Create Account' }}
          </button>

          <div class="social-login">
            <p>Or sign up with</p>
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
            <p>Already have an account? <a routerLink="/auth/login">Sign in</a></p>
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
      .form-row {
        display: flex;
        gap: 1rem;
        margin-bottom: 1.5rem;
        width: 100%;

        .form-group {
          flex: 1;
          min-width: 0;
          margin: 0;
        }
      }

      .form-group {
        margin-bottom: 1.5rem;
        width: 100%;
      }

      .full-width {
        width: 100%;
      }

      .form-options {
        margin-bottom: 1.5rem;

        .terms-link {
          color: #1976d2;
          text-decoration: none;

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

      .form-row {
        flex-direction: column;
        gap: 1.5rem;
      }

      .social-buttons {
        grid-template-columns: 1fr !important;
      }
    }
  `]
})
export class RegisterComponent {
  registerForm: FormGroup;
  hidePassword = true;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, Validators.required],
      role: [null, Validators.required],
      terms: [false, Validators.requiredTrue]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup | null): { [key: string]: boolean } | null {
    if (!g) return null;
    const password = g.get('password')?.value;
    const confirmPassword = g.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      const { confirmPassword, terms, ...registerData } = this.registerForm.value;
      
      this.authService.register(registerData).subscribe({
        next: () => {
          this.router.navigate(['/auth/login']);
          this.snackBar.open('Registration successful! Please login.', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        },
        error: (error) => {
          this.snackBar.open(error.message || 'Registration failed', 'Close', {
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