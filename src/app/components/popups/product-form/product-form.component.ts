import { Component, EventEmitter, Output, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PopupControllerService } from '../../services/popup-controller.service';
import { Product } from '../../types';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule, RatingModule],
  templateUrl: './product-form.component.html',
})
export class ProductFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private popupController = inject(PopupControllerService);

  @Output() submit = new EventEmitter<Product>();

  form!: FormGroup;
  mode: 'add' | 'edit' = 'add';

  ngOnInit(): void {
    this.popupController.mode$.subscribe(mode => {
      this.mode = mode || 'add';
    });

    this.popupController.product$.subscribe(product => {
      this.buildForm(product);
    });
  }

  buildForm(product: Product | null) {
    this.form = this.fb.group({
      name: [product?.name || '', [Validators.required]],
      image: [product?.image || ''],
      price: [product?.price || '', [Validators.required]],
      rating: [product?.rating || 0],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submit.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
