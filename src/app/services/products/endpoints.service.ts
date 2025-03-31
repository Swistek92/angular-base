import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EndpointsService {
  private readonly BASE_URL = 'http://localhost:3000';

  getClothes(): string {
    return `${this.BASE_URL}/clothes`;
  }

  getClothesById(id: number): string {
    return `${this.BASE_URL}/clothes/${id}`;
  }
}
