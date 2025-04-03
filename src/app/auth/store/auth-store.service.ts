import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthUser } from '../../types';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthStoreService {
  private userSubject = new BehaviorSubject<AuthUser | null>(null);
  public user$: Observable<AuthUser | null> = this.userSubject.asObservable();

  constructor() {}

  isLoggedIn$: Observable<boolean> = this.user$.pipe(map(user => !!user));

  isAdmin$: Observable<boolean> = this.user$.pipe(map(user => user?.role === 'admin'));

  logout(): void {
    this.clearUser();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  // 📦 Set user after login/me()
  setUser(user: AuthUser): void {
    this.userSubject.next(user);
  }

  // ❌ Clear on logout
  clearUser(): void {
    this.userSubject.next(null);
  }

  // ✅ Synchronous getters (np. do guardów)
  getUser(): AuthUser | null {
    return this.userSubject.getValue();
  }

  isLoggedIn(): boolean {
    return !!this.getUser();
  }

  hasRole(role: 'admin' | 'user'): boolean {
    return this.getUser()?.role === role;
  }

  hasId(id: number): boolean {
    return this.getUser()?.id === id;
  }
}
