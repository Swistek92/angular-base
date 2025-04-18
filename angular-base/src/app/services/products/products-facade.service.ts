import { Injectable } from '@angular/core';
import { ProductsService } from './products.service';
import { Product, Products } from '../../types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClothesFacadeService {
  constructor(private productsService: ProductsService) {}

  fetchProducts(page: number, perPage: number): Observable<Products> {
    return this.productsService.getProducts({ page, perPage });
  }

  getProductById(id: number): Observable<Product> {
    return this.productsService.getProductById(id);
  }

  addProduct(product: Product): Observable<Product> {
    return this.productsService.addProduct(product);
  }

  editProduct(product: Product, id: number): Observable<Product> {
    return this.productsService.editProduct(product, id);
  }

  deleteProduct(id: number): Observable<void> {
    return this.productsService.deleteProduct(id);
  }
}
