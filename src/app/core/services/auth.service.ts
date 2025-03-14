import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User, AuthResponse, LoginCredentials, RegisterCredentials } from '../models/user.model';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'https://your-backend-url.com/api'; // Update API URL for deployment
  private readonly TOKEN_KEY = 'auth_token';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  
  // Demo accounts
  private readonly demoAccounts = [
    {
      email: 'nikhilraj719@gmail.com',
      password: 'Demo@123',
      firstName: 'Nikhil',
      lastName: 'Raj',
      role: 'seller' as const
    },
    {
      email: 'demo123@gmail.com',
      password: 'Demo@123',
      firstName: 'Demo',
      lastName: 'User',
      role: 'buyer' as const
    }
  ];
  
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadStoredUser();
  }

  private loadStoredUser(): void {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        this.currentUserSubject.next(decodedToken.user);
      } catch (error) {
        localStorage.removeItem(this.TOKEN_KEY);
      }
    }
  }

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    // Check for demo accounts
    const demoUser = this.demoAccounts.find(
      account => account.email === credentials.email && account.password === credentials.password
    );

    if (demoUser) {
      const response: AuthResponse = {
        user: {
          id: crypto.randomUUID(),
          email: demoUser.email,
          firstName: demoUser.firstName,
          lastName: demoUser.lastName,
          role: demoUser.role,
          createdAt: new Date(),
          lastLogin: new Date()
        },
        token: 'demo-jwt-token'
      };
      return of(response).pipe(
        tap(response => this.handleAuthResponse(response))
      );
    }

    // If not a demo account, proceed with actual API call
    return this.http.post<AuthResponse>(`${this.API_URL}/auth/login`, credentials)
      .pipe(
        tap(response => this.handleAuthResponse(response))
      );
  }

  register(credentials: RegisterCredentials): Observable<AuthResponse> {
    // Prevent registration with demo emails
    if (this.demoAccounts.some(account => account.email === credentials.email)) {
      return throwError(() => new Error('This email is already registered'));
    }

    return this.http.post<AuthResponse>(`${this.API_URL}/auth/register`, credentials)
      .pipe(
        tap(response => this.handleAuthResponse(response))
      );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.currentUserSubject.next(null);
  }

  private handleAuthResponse(response: AuthResponse): void {
    localStorage.setItem(this.TOKEN_KEY, response.token);
    this.currentUserSubject.next(response.user);
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  connectBackend(): Observable<any> {
    return this.http.get(`${this.API_URL}/connect`).pipe(
      tap(response => console.log('Connected to backend:', response))
    );
  }
}