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
    return `${this.BASE_URL}/login`;
  }

  register(): string {
    return `${this.BASE_URL}/register`;
  }

  refresh(): string {
    return `${this.BASE_URL}/refresh`;
  }

  me(): string {
    return `${this.BASE_URL}/me`;
  }

  logout(): string {
    return `${this.BASE_URL}/logout`;
  }
}
