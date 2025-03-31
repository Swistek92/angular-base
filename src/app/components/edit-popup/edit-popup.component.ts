import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Product } from '../../types';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';

@Component({
  standalone: true,
  selector: 'app-edit-popup',
  imports: [DialogModule, CommonModule, FormsModule, RatingModule, ButtonModule],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.scss',
})
export class EditPopupComponent {
  @Input() display: boolean = false;
  @Input() header!: string;

  @Input() product: Product = {
    name: '',
    image: '',
    price: '',
    rating: 0,
  };
  @Output() confirm = new EventEmitter<Product>();
  @Output() displayChange = new EventEmitter<boolean>();
  selectedProduct: Product = {
    name: '',
    image: '',
    price: '',
    rating: 0,
  };

  ngOnChanges(): void {
    // Tworzymy kopię przy starcie
    this.selectedProduct = JSON.parse(JSON.stringify(this.product));
    console.log('ngOnInit', this.product);
  }
  onConfirm() {
    this.confirm.emit(this.selectedProduct);
    this.display = false;
    this.displayChange.emit(false); // zamiast this.display = false
  }

  onCancel() {
    // this.confirm.emit();

    this.displayChange.emit(false); // zamiast this.display = false
    this.display = false;
  }
}
