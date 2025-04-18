import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../../decorators/roles.decorator';
import { Role } from '../../enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    // Rola użytkownika nie znajduje się w wymaganych? Blokujemy.
    if (!requiredRoles.includes(user.role)) {
      return false;
    }

    // Dodatkowy warunek dla usera:
    if (user.role === Role.USER) {
      // Sprawdź dodatkowe pola (np. verified === true)
      return user.verified === true && user.isActive === true;
    }

    // Dla admina i moderatora — jeśli rola pasuje, to wpuszczamy
    return true;
  }
}
