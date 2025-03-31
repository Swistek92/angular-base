import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Product } from '../../types';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';

@Component({
  standalone: true,
  selector: 'app-edit-popup',
  imports: [
    DialogModule,
    CommonModule,
    FormsModule,
    RatingModule,
    ButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.scss',
})
export class EditPopupComponent {
  constructor(private formBuilder: FormBuilder) {}
  @Input() display: boolean = false;
  @Input() header!: string;

  @Input() product: Product = {
    id: 0,
    name: '',
    image: '',
    price: '',
    rating: 0,
  };
  @Output() confirm = new EventEmitter<Product>();
  @Output() displayChange = new EventEmitter<boolean>();
  productForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(): void {
    if (this.productForm) {
      this.productForm.patchValue(this.product);
    }
  }

  specialCharacterValidator(): ValidatorFn {
    return control => {
      const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(control.value);

      return hasSpecialCharacter ? { hasSpecialCharacter: true } : null;
    };
  }

  initForm(): void {
    this.productForm = this.formBuilder.group({
      name: [this.product?.name || '', [Validators.required, this.specialCharacterValidator()]],
      image: [this.product?.image || '', []],
      price: [this.product?.price || '', [Validators.required]],
      rating: [this.product?.rating || 0, []],
    });
  }

  onConfirm() {
    console.log(this.productForm.value);
    this.confirm.emit(this.productForm.value);

    this.display = false;
    this.displayChange.emit(false);
  }

  onCancel() {
    this.displayChange.emit(false);
    this.display = false;
  }
}
