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
      next: user => {
        this.setUser(user); // ✅ używamy metody setUser
        console.log('🔓 Zalogowany użytkownik:', user);
      },
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

  // ✅ Set user directly into the store
  setUser(user: AuthUser): void {
    this.authStore.setUser(user);
  }

  // ADMIN
  updateUser(id: number, data: UpdateUserPayload): Observable<AuthUser> {
    return this.api.put<AuthUser>(this.endpoints.updateUser(id), data, {});
  }

  deleteUser(id: number): Observable<{ message: string }> {
    console.log('Deleting user with ID:', id);
    return this.api.delete<{ message: string }>(this.endpoints.deleteUser(id), {});
  }

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
