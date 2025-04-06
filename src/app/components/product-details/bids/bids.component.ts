import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BidsFacadeService } from '../../../services/bids/bids-facade.service';
import { Bid, CreateBidPayload } from '../../../types';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { AuthStoreService } from '../../../services/user-auth/auth-store.service';

@Component({
  selector: 'app-bids',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputNumberModule],
  templateUrl: './bids.component.html',
  styleUrls: ['./bids.component.scss'],
})
export class BidsComponent implements OnInit {
  @Input() productId!: number;

  bids: Bid[] = [];
  newBidAmount: number | null = null;
  loading = false;

  private bidsFacade = inject(BidsFacadeService);
  private authStore = inject(AuthStoreService);

  ngOnInit(): void {
    if (this.productId) {
      this.fetchBids();
    }
  }

  fetchBids(): void {
    this.loading = true;
    this.bidsFacade.getBidsByProduct(this.productId).subscribe({
      next: bids => {
        this.bids = bids.sort((a, b) => b.amount - a.amount);
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  placeBid(): void {
    if (!this.newBidAmount) return;

    const user = this.authStore.getUser();
    if (!user) return;

    const payload: CreateBidPayload = {
      productId: this.productId,
      amount: this.newBidAmount,
      userId: user.id,
      userName: user.email,
      avatar: user.avatar ?? 'assets/avatars/default.png',
    };

    this.bidsFacade.createBid(payload).subscribe({
      next: () => {
        this.newBidAmount = null;
        this.fetchBids();
      },
    });
  }

  deleteBid(id: number): void {
    this.bidsFacade.deleteBid(id).subscribe(() => this.fetchBids());
  }
}
