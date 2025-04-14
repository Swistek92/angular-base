import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthFacadeService } from '../../user-auth/auth-facade.service';

export const adminGuard: CanActivateFn = () => {
  const authFacade = inject(AuthFacadeService);
  const router = inject(Router);

  if (authFacade.isAdmin()) {
    console.log('✅ Admin access granted');
    return true;
  }

  // 🚫 Przekieruj jeśli nie admin
  console.log('⛔ Brak dostępu — nie admin');
  router.navigate(['/']);
  return false;
};
