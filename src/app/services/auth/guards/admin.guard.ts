import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStoreService } from '../../user-auth/auth-store.service';
import { AuthAccessService } from '../../user-auth/auth-access.service';
// import { AuthStoreService } from '../services/user-auth/auth-store.service';

export const adminGuard: CanActivateFn = () => {
  const authStore = inject(AuthAccessService);
  const router = inject(Router);
  // console.log('Admin access 111');

  if (authStore.isAdmin()) {
    console.log('Admin access granted');
    console.log(authStore.hasRole('admin'));
    return true;
  }

  // 🚫 Przekieruj jeśli nie admin
  router.navigate(['/']);
  return false;
};
