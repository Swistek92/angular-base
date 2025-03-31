import { Injectable } from '@angular/core';
import { ProductsService } from './products.service';
import { EndpointsService } from './endpoints.service';
import { Product, Products } from '../../types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClothesFacadeService {
  constructor(
    private productsService: ProductsService,
    private endpoints: EndpointsService
  ) {}

  fetchProducts(page: number, perPage: number): Observable<Products> {
    return this.productsService.getProducts(this.endpoints.getClothes(), { page, perPage });
  }

  editProduct(product: Product, id: number): Observable<Product> {
    return this.productsService.editProduct(this.endpoints.getClothesById(id), product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.productsService.deleteProduct(this.endpoints.getClothesById(id));
  }

  addProduct(product: Product): Observable<Product> {
    return this.productsService.addProduct(this.endpoints.getClothes(), product);
  }
}
