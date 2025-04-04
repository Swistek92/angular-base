import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import {
  AuthUser,
  AuthResponse,
  LoginPayload,
  RefreshResponse,
  RegisterPayload,
  UpdateUserPayload,
} from '../../types';

@Injectable({
  providedIn: 'root',
})
export class AuthFacadeService {
  constructor(private authService: AuthService) {}

  // 🔐 Login
  login(payload: LoginPayload): Observable<AuthResponse> {
    return this.authService.login(payload);
  }

  // 🆕 Register
  register(payload: RegisterPayload): Observable<{ message: string }> {
    return this.authService.register(payload);
  }

  // 👤 Me
  getCurrentUser(): Observable<AuthUser> {
    return this.authService.me();
  }

  // 🔄 Refresh token
  refreshToken(): Observable<RefreshResponse> {
    return this.authService.refreshToken();
  }

  // 🔁 Autologin
  autoLogin(): void {
    this.authService.autoLogin();
  }

  // ✅ Set user in store
  setUser(user: AuthUser): void {
    this.authService.setUser(user);
  }

  // 📦 Token helpers
  setTokens(access: string, refresh: string): void {
    this.authService.setTokens(access, refresh);
  }

  getAccessToken(): string | null {
    return this.authService.getAccessToken();
  }

  getRefreshToken(): string | null {
    return this.authService.getRefreshToken();
  }

  clearSession(): void {
    this.authService.clearSession();
  }

  // 🚪 Logout
  logout(): void {
    this.authService.logout();
  }

  // 🔍 Login status
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  // 🔍 Verify token
  checkTokenValidity(token: string): Promise<void> {
    return this.authService.checkTokenValidity(token);
  }

  // 📋 ADMIN — get all users
  getAllUsers(): Observable<AuthUser[]> {
    return this.authService.getAllUsers();
  }

  // 🛠️ ADMIN — update user
  updateUser(id: number, data: UpdateUserPayload): Observable<AuthUser> {
    return this.authService.updateUser(id, data);
  }

  // ❌ ADMIN — delete user
  deleteUser(id: number): Observable<{ message: string }> {
    return this.authService.deleteUser(id);
  }
}
