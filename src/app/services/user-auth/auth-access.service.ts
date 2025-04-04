import { Injectable } from '@angular/core';
import { AuthStoreService } from './auth-store.service';
import { AuthUser, UserRole } from '../../types';

@Injectable({ providedIn: 'root' })
export class AuthAccessService {
  constructor(private store: AuthStoreService) {}

  private get user(): AuthUser | null {
    return this.store.getUser();
  }

  isLoggedIn(): boolean {
    return !!this.user;
  }

  isAdmin(): boolean {
    return this.user?.role === 'admin';
  }

  isUser(): boolean {
    return this.user?.role === 'user';
  }

  isActive(): boolean {
    return !!this.user?.isActive;
  }

  hasRole(role: UserRole): boolean {
    return this.user?.role === role;
  }

  isOwner(id: number): boolean {
    return this.user?.id === id;
  }
}
