import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStoreService } from '../store/auth-store.service';

export const authGuard: CanActivateFn = () => {
  const authStore = inject(AuthStoreService);
  const router = inject(Router);

  const isLoggedIn = authStore.isLoggedIn();

  if (!isLoggedIn) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
