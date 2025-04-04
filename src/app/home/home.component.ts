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
import { HomeService } from '../services/home-service';

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
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  products: Product[] = [];
  totalRecords = 0;
  rows = 5;

  @ViewChild('paginator') paginator?: Paginator;

  constructor(
    private clothesFacade: ClothesFacadeService,
    public homeCtrl: HomeService
  ) {}

  ngOnInit() {
    this.fetchProducts(0, this.rows);
  }

  onPageChange(event: any) {
    this.fetchProducts(event.page, event.rows);
  }

  fetchProducts(page: number, perPage: number) {
    this.clothesFacade.fetchProducts(page, perPage).subscribe(res => {
      this.products = res.items;
      this.totalRecords = res.total;
    });
  }

  onPopupConfirm(product: Product) {
    this.homeCtrl.confirmPopup(product, () => {
      this.fetchProducts(0, this.rows);
      this.resetPaginator();
    });
  }

  resetPaginator() {
    this.paginator?.changePage(0);
  }

  deleteProduct(id: number) {
    this.clothesFacade.deleteProduct(id).subscribe(() => {
      this.fetchProducts(0, this.rows);
      this.resetPaginator();
    });
  }
}
