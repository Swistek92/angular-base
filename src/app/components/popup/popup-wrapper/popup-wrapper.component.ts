import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-popup-wrapper',
  standalone: true,
  imports: [CommonModule, DialogModule],
  templateUrl: './popup-wrapper.component.html',
})
export class PopupWrapperComponent {
  @Input() visible: boolean = false;
  @Input() title: string = '';
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}

// import { CommonModule } from '@angular/common';
// import { Component, EventEmitter, Input, Output } from '@angular/core';
// import { DialogModule } from 'primeng/dialog';
// import { Product } from '../../types';
// import {
//   FormBuilder,
//   FormGroup,
//   FormsModule,
//   ReactiveFormsModule,
//   ValidatorFn,
//   Validators,
// } from '@angular/forms';
// import { RatingModule } from 'primeng/rating';
// import { ButtonModule } from 'primeng/button';

// @Component({
//   standalone: true,
//   selector: 'app-popup',
//   imports: [
//     DialogModule,
//     CommonModule,
//     FormsModule,
//     RatingModule,
//     ButtonModule,
//     ReactiveFormsModule,
//   ],
//   templateUrl: './popup.component.html',
//   styleUrl: './popup.component.scss',
// })
// export class PopupComponent {
//   constructor(private formBuilder: FormBuilder) {}
//   @Input() display: boolean = false;
//   @Input() header!: string;

//   @Input() product: Product = {
//     id: 0,
//     name: '',
//     image: '',
//     price: '',
//     rating: 0,
//   };
//   @Output() confirm = new EventEmitter<Product>();
//   @Output() displayChange = new EventEmitter<boolean>();
//   productForm!: FormGroup;

//   ngOnInit(): void {
//     this.initForm();
//   }

//   ngOnChanges(): void {
//     if (this.productForm) {
//       this.productForm.patchValue(this.product);
//     }
//   }

//   specialCharacterValidator(): ValidatorFn {
//     return control => {
//       const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(control.value);

//       return hasSpecialCharacter ? { hasSpecialCharacter: true } : null;
//     };
//   }

//   initForm(): void {
//     this.productForm = this.formBuilder.group({
//       name: [this.product?.name || '', [Validators.required, this.specialCharacterValidator()]],
//       image: [this.product?.image || '', []],
//       price: [this.product?.price || '', [Validators.required]],
//       rating: [this.product?.rating || 0, []],
//     });
//   }

//   onConfirm() {
//     console.log(this.productForm.value);
//     this.confirm.emit(this.productForm.value);

//     this.display = false;
//     this.displayChange.emit(false);
//   }

//   onCancel() {
//     this.displayChange.emit(false);
//     this.display = false;
//   }
// }
