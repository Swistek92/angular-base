import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BidsFacadeService } from '../../../services/bids/bids-facade.service';
import { AuthUser, Bid, CreateBidPayload } from '../../../types';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { AuthFacadeService } from '../../../services/user-auth/auth-facade.service';

@Component({
  selector: 'app-bids',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputNumberModule],
  templateUrl: './bids.component.html',
  styleUrls: ['./bids.component.scss'],
})
export class BidsComponent implements OnInit {
  @Input() productId!: number;
  @Input() productPrice!: number;

  bids: Bid[] = [];
  newBidAmount: number | null = null;
  loading = false;
  maxPrice!: number;

  private bidsFacade = inject(BidsFacadeService);
  private authFacade = inject(AuthFacadeService);
  currentUser: AuthUser | null = null;

  get isActiveUser(): boolean {
    return this.authFacade.isLoggedIn() && this.authFacade.isActive();
  }

  ngOnInit(): void {
    this.currentUser = this.authFacade.getUser();
    if (this.productId && this.productPrice != null) {
      this.maxPrice = this.productPrice;
      this.fetchBids();
    }
  }

  fetchBids(): void {
    this.loading = true;
    this.bidsFacade.getBidsByProduct(this.productId).subscribe({
      next: bids => {
        this.bids = bids.sort((a, b) => b.amount - a.amount);
        if (this.bids.length > 0) {
          this.maxPrice = Math.max(this.productPrice, this.bids[0].amount);
        }
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  placeBid(): void {
    if (!this.isActiveUser) return;

    if (this.newBidAmount == null || this.newBidAmount <= this.maxPrice) {
      return;
    }

    const user = this.authFacade.getUser();
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
