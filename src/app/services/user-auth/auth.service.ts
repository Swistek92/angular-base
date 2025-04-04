import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { EndpointsService } from '../endpoints.service';
import {
  AuthResponse,
  AuthUser,
  LoginPayload,
  RefreshResponse,
  RegisterPayload,
  UpdateUserPayload,
} from '../../types';
import { AuthStoreService } from './auth-store.service';
import { TokenVerifyService } from './token-verify.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private api: ApiService,
    private endpoints: EndpointsService,
    private authStore: AuthStoreService,
    private tokenVerify: TokenVerifyService
  ) {}

  async checkTokenValidity(token: string) {
    const payload = await this.tokenVerify.verifyToken(token);
    console.log(payload ? '✅ Token OK:' : '❌ Token niepoprawny lub wygasł', payload);
  }

  autoLogin(): void {
    const token = this.getAccessToken();
    if (!token) return;

    this.me().subscribe({
      next: user => this.authStore.setUser(user),
      error: () => this.logout(),
    });
  }

  login(payload: LoginPayload): Observable<AuthResponse> {
    return this.api.post<AuthResponse>(this.endpoints.login(), payload, {});
  }

  register(payload: RegisterPayload): Observable<{ message: string }> {
    return this.api.post<{ message: string }>(this.endpoints.register(), payload, {});
  }

  refreshToken(): Observable<RefreshResponse> {
    const refreshToken = this.getRefreshToken();
    return this.api.post<RefreshResponse>(this.endpoints.refresh(), { refreshToken }, {});
  }

  me(): Observable<AuthUser> {
    return this.api.get<AuthUser>(this.endpoints.me(), {});
  }

  logout(): void {
    this.api.post(this.endpoints.logout(), {}, {}).subscribe({
      next: () => this.clearSession(),
      error: () => this.clearSession(),
    });
  }
  // ADMIN
  // ✅ PATCH – aktualizacja użytkownika
  updateUser(id: number, data: UpdateUserPayload): Observable<AuthUser> {
    return this.api.put<AuthUser>(this.endpoints.updateUser(id), data, {});
  }
  // ADMIN
  // ❌ DELETE – usunięcie użytkownika
  deleteUser(id: number): Observable<{ message: string }> {
    return this.api.delete<{ message: string }>(this.endpoints.deleteUser(id), {});
  }
  // ADMIN
  getAllUsers(): Observable<AuthUser[]> {
    return this.api.get<AuthUser[]>(this.endpoints.getAllUsers(), {});
  }

  // Helpers
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
    this.authStore.clearUser();
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }
}
