import { Injectable } from '@angular/core';
import { PopupMode, Product } from '../types';
import { ClothesFacadeService } from './products/products-facade.service';

@Injectable({ providedIn: 'root' })
export class HomeService {
  selectedProduct: Product = this.emptyProduct();
  popupMode: PopupMode = null;

  constructor(private facade: ClothesFacadeService) {}

  get displayPopup(): boolean {
    return this.popupMode !== null;
  }

  get popupTitle(): string {
    return this.popupMode === 'edit' ? 'Edit Product' : 'Add Product';
  }

  openAdd() {
    this.selectedProduct = this.emptyProduct();
    this.popupMode = 'add';
  }

  openEdit(product: Product) {
    this.selectedProduct = product;
    this.popupMode = 'edit';
  }

  cancelPopup() {
    this.popupMode = null;
  }

  confirmPopup(product: Product, refreshFn: () => void) {
    if (this.popupMode === 'edit' && this.selectedProduct.id) {
      this.facade.editProduct(product, this.selectedProduct.id).subscribe(refreshFn);
    } else {
      this.facade.addProduct(product).subscribe(refreshFn);
    }
    this.popupMode = null;
  }

  private emptyProduct(): Product {
    return {
      id: 0,
      name: '',
      image: '',
      price: '',
      rating: 0,
      ownerId: 0,
      ownerName: '',
      description: '',
      createdAt: new Date().toISOString(),
      category: '',
      available: true,
      views: 0,
      tags: [],
      location: '',
    };
  }
}
