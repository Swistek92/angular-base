import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product, Products } from '../types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { EndpointsService } from '../services/endpoints.service';
import { ClothesFacadeService } from '../services/clothes-facade.service';

@Component({
  selector: 'app-home',
  imports: [
    ProductComponent,
    CommonModule,
    PaginatorModule,
    EditPopupComponent,
    ButtonModule,
    DialogModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private clothesFacade: ClothesFacadeService) {}
  @ViewChild('paginator') paginator: Paginator | undefined;
  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }
  products: Product[] = [];
  totalRecords: number = 0;
  rows: number = 5;

  displayEditPopup: boolean = false;
  displayAddPopup: boolean = false;

  selectedProduct: Product = {
    id: 0,
    name: '',
    image: '',
    price: '',
    rating: 0,
  };
  toggleEditPopup(product: Product) {
    this.selectedProduct = product;
    this.displayEditPopup = true;
  }

  toggleDeletePopup(product: Product) {
    if (!product.id) {
      return;
    }

    this.deleteProduct(product.id);
  }

  toggleAddPopup() {
    this.displayAddPopup = true;
  }

  onConfirmEdit(product: Product) {
    if (!this.selectedProduct.id) {
      return;
    }

    this.editProduct(product, this.selectedProduct.id);
    this.fetchProducts(0, this.rows);
    this.displayEditPopup = false;
  }

  onConfirmAdd(product: Product) {
    this.addProduct(product);
    this.displayAddPopup = false;
  }

  onProductOutput(product: Product) {}

  onPageChange(event: any) {
    this.fetchProducts(event.page, event.rows);
  }

  ngOnInit() {
    this.fetchProducts(0, this.rows);
  }

  resetPaginator() {
    this.paginator?.changePage(0);
  }

  // helper
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
