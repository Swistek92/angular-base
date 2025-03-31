import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product, Products, PopupMode } from '../types';
import { ProductComponent } from '../components/product/product.component';
import { ProductFormComponent } from '../components/popup/product-form/product-form.component';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { PopupWrapperComponent } from '../components/popup/popup-wrapper/popup-wrapper.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ClothesFacadeService } from '../services/products/clothes-facade.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ProductComponent,
    ProductFormComponent,
    PaginatorModule,
    ButtonModule,
    DialogModule,
    PopupWrapperComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private clothesFacade: ClothesFacadeService) {}

  @ViewChild('paginator') paginator: Paginator | undefined;

  products: Product[] = [];
  totalRecords: number = 0;
  rows: number = 5;

  popupMode: PopupMode = null;

  selectedProduct: Product = {
    id: 0,
    name: '',
    image: '',
    price: '',
    rating: 0,
  };

  get displayPopup(): boolean {
    return this.popupMode !== null;
  }

  get popupTitle(): string {
    return this.popupMode === 'edit' ? 'Edit Product' : 'Add Product';
  }

  ngOnInit() {
    this.fetchProducts(0, this.rows);
  }

  toggleAddPopup() {
    this.selectedProduct = {
      id: 0,
      name: '',
      image: '',
      price: '',
      rating: 0,
    };
    this.popupMode = 'add';
  }

  toggleEditPopup(product: Product) {
    this.selectedProduct = product;
    this.popupMode = 'edit';
  }

  toggleDeletePopup(product: Product) {
    if (product.id) {
      this.deleteProduct(product.id);
    }
  }

  onPopupCancel() {
    this.popupMode = null;
  }

  onPopupConfirm(product: Product) {
    if (this.popupMode === 'edit' && this.selectedProduct.id) {
      this.editProduct(product, this.selectedProduct.id);
    } else {
      this.addProduct(product);
    }
    this.popupMode = null;
  }

  onPageChange(event: any) {
    this.fetchProducts(event.page, event.rows);
  }

  resetPaginator() {
    this.paginator?.changePage(0);
  }

  fetchProducts(page: number, perPage: number) {
    this.clothesFacade.fetchProducts(page, perPage).subscribe((products: Products) => {
      this.products = products.items;
      this.totalRecords = products.total;
    });
  }

  editProduct(product: Product, id: number) {
    this.clothesFacade.editProduct(product, id).subscribe({
      next: () => {
        this.fetchProducts(0, this.rows);
        this.resetPaginator();
      },
      error: error => console.log(error),
    });
  }

  deleteProduct(id: number) {
    this.clothesFacade.deleteProduct(id).subscribe({
      next: () => {
        this.fetchProducts(0, this.rows);
        this.resetPaginator();
      },
      error: error => console.log(error),
    });
  }

  addProduct(product: Product) {
    this.clothesFacade.addProduct(product).subscribe({
      next: () => {
        this.fetchProducts(0, this.rows);
        this.resetPaginator();
      },
      error: error => console.log(error),
    });
  }
}
