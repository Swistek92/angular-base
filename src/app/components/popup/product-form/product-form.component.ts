import { Component, EventEmitter, Output, OnInit, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PopupControllerService } from '../../../services/popup/popup-controller.service';
import { PopupMode, Product } from '../../../types';
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
  private popupController = inject(PopupControllerService<Product>);
  @Input() product: Product | null = null;
  @Input() mode: PopupMode = 'add';

  @Output() submit = new EventEmitter<Product>();

  @Output() cancel = new EventEmitter<void>();

  onCancel(): void {
    this.cancel.emit();
  }

  form!: FormGroup;
  // mode!: PopupMode;

  ngOnInit(): void {
    this.popupController.mode$.subscribe(mode => {
      this.mode = mode;
    });

    this.popupController.data$.subscribe(product => {
      this.buildForm(product);
    });
  }
  ngOnChanges(): void {
    if (this.mode === 'edit') {
      console.log(this.product);
      this.buildForm(this.product);
    } else {
      this.buildForm(null);
    }
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
