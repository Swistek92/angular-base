import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { PaginationParams, Product, Products } from '../../types';
import { EndpointsService } from '../endpoints.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(
    private apiService: ApiService,
    private endpoints: EndpointsService
  ) {}

  getProducts(params: PaginationParams): Observable<Products> {
    return this.apiService.get<Products>(this.endpoints.getClothes(), {
      responseType: 'json',
      params,
    });
  }

  getProductById(id: number): Observable<Product> {
    return this.apiService.get<Product>(this.endpoints.getClothesById(id), {
      responseType: 'json',
    });
  }

  addProduct(product: Product): Observable<Product> {
    return this.apiService.post<Product>(this.endpoints.createClothes(), product, {});
  }

  editProduct(product: Product, id: number): Observable<Product> {
    return this.apiService.put<Product>(this.endpoints.updateClothes(id), product, {});
  }

  deleteProduct(id: number): Observable<void> {
    return this.apiService.delete<void>(this.endpoints.deleteClothes(id), {});
  }
}
