import { Component, EventEmitter, Output, OnInit, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PopupControllerService } from '../../../services/popup/popup-controller.service';
import { PopupMode, Product } from '../../../types';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { PopupWrapperComponent } from '../popup-wrapper/popup-wrapper.component';

interface ProductFormControls {
  name: FormControl;
  price: FormControl;
  image: FormControl;
  rating: FormControl;
}

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    RatingModule,
    PopupWrapperComponent,
  ],
  templateUrl: './product-form.component.html',
})
export class ProductFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private popupController = inject(PopupControllerService<Product>);

  @Input() product: Product | null = null;
  @Input() mode: PopupMode = 'add';

  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  @Output() submit = new EventEmitter<Product>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup;
  submitted: boolean = false;

  ngOnInit(): void {
    this.popupController.mode$.subscribe(mode => {
      this.mode = mode;
    });

    this.popupController.data$.subscribe(product => {
      this.buildForm(product);
    });
  }

  ngOnChanges(): void {
    console.log('ngOnChanges', this.product, this.mode);
    if (this.mode === 'edit') {
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
    this.submitted = false;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.valid) {
      this.submit.emit(this.form.value);
      this.hide();
    } else {
      this.form.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.hide();
    this.cancel.emit();
  }

  hide(): void {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  get f() {
    return this.form.controls;
  }
}
