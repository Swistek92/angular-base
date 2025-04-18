import { Component, EventEmitter, Input, Output, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../types';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { PricePipe } from '../../pipes/price.pipe';
import { TruncateNamePipe } from '../../pipes/truncate-name.pipe';
import { Router, RouterModule } from '@angular/router';
import { LoadingComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    RatingModule,
    FormsModule,
    ButtonModule,
    ConfirmPopupModule,
    PricePipe,
    TruncateNamePipe,
    RouterModule,
  ],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [ConfirmationService],
})
export class ProductComponent implements OnInit {
  constructor(
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  @ViewChild('deleteButton') deleteButton: any;
  @Input() product!: Product;

  @Output() edit: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() delete: EventEmitter<Product> = new EventEmitter<Product>();

  goToDetails(): void {
    this.router.navigate(['/product', this.product.id]);
  }

  editProduct() {
    this.edit.emit(this.product);
  }

  confirmDelete() {
    this.confirmationService.confirm({
      target: this.deleteButton.nativeElement,
      message: 'Are you sure you want to delete this product?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.delete.emit(this.product);
      },
    });
  }

  ngOnInit(): void {
    //
  }
}
