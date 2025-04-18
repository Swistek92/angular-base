import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Product } from '../../types';
import { ClothesFacadeService } from '../../services/products/products-facade.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoadingComponent } from '../spinner/spinner.component';
import { TagModule } from 'primeng/tag';
import { BidsComponent } from './bids/bids.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CommonModule,
    TagModule,
    RouterModule,
    CardModule,
    ButtonModule,
    ProgressSpinnerModule,
    BidsComponent,
  ],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private clothesFacade: ClothesFacadeService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(id)) {
      this.clothesFacade.getProductById(id).subscribe({
        next: product => {
          this.product = product;
          console.log('Product loaded:', product);
          this.loading = false;
        },
        error: err => {
          console.error('Failed to load product:', err);
          this.loading = false;
        },
      });
    } else {
      this.loading = false;
    }
  }
}
