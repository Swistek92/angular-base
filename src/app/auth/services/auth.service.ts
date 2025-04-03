import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EndpointsService } from '../../services/endpoints.service';
import {
  AuthResponse,
  AuthUser,
  LoginPayload,
  RefreshResponse,
  RegisterPayload,
} from '../../types';
import { AuthStoreService } from '../store/auth-store.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private http: HttpClient,
    private endpoints: EndpointsService,
    private authStore: AuthStoreService
  ) {}

  // ✅ Automatyczne logowanie przy starcie appki
  autoLogin(): void {
    const token = this.getAccessToken();
    if (!token) return;

    this.me().subscribe({
      next: user => this.authStore.setUser(user),
      error: () => this.logout(), // Token nieważny? Wyloguj
    });
  }

  // 🔐 Login
  login(payload: LoginPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.endpoints.login(), payload);
  }

  // 🆕 Rejestracja
  register(payload: RegisterPayload): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.endpoints.register(), payload);
  }

  // 🔄 Odświeżenie tokena
  refreshToken(): Observable<RefreshResponse> {
    const refreshToken = this.getRefreshToken();
    return this.http.post<RefreshResponse>(this.endpoints.refresh(), { refreshToken });
  }

  // 👤 Pobierz aktualnego usera
  me(): Observable<AuthUser> {
    return this.http.get<AuthUser>(this.endpoints.me());
  }

  // 🚪 Wyloguj użytkownika
  logout(): void {
    this.http.post(this.endpoints.logout(), {}).subscribe({
      next: () => this.clearSession(),
      error: () => this.clearSession(), // fallback
    });
  }

  // 📦 TOKEN HELPERS
  setTokens(access: string, refresh: string): void {
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  clearSession(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.authStore.clearUser(); // 🧼 usuwa usera z BehaviorSubject
  }

  // 🔍 Status loginu
  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }
}
