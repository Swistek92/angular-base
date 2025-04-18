// src/app/core/services/token-verify.service.ts
import { Injectable } from '@angular/core';
import { jwtVerify, importSPKI, JWTPayload } from 'jose';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TokenVerifyService {
  async verifyToken(token: string): Promise<JWTPayload | null> {
    try {
      const key = await importSPKI(environment.publicKey, 'RS256');
      const { payload } = await jwtVerify(token, key);
      return payload;
    } catch (error) {
      console.error('❌ Token verification failed:', error);
      return null;
    }
  }
}
