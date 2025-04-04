import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EndpointsService {
  private readonly BASE_URL = 'http://localhost:3000';

  // 🧾 CLOTHES
  getClothes(): string {
    return `${this.BASE_URL}/clothes`;
  }

  getClothesById(id: number): string {
    return `${this.BASE_URL}/clothes/${id}`;
  }

  // 🔐 AUTH
  login(): string {
    return `${this.BASE_URL}/auth/login`;
  }

  register(): string {
    return `${this.BASE_URL}/auth/register`;
  }

  refresh(): string {
    return `${this.BASE_URL}/auth/refresh`;
  }

  me(): string {
    return `${this.BASE_URL}/auth/me`;
  }

  logout(): string {
    return `${this.BASE_URL}/auth/logout`;
  }
}
