import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { EndpointsService } from '../endpoints.service';
import { Bid, CreateBidPayload } from '../../types';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BidsService {
  constructor(
    private api: ApiService,
    private endpoints: EndpointsService
  ) {}

  getBidsByProduct(productId: number): Observable<Bid[]> {
    return this.api.get<Bid[]>(this.endpoints.getBidById(productId), {});
  }

  createBid(bid: CreateBidPayload): Observable<Bid> {
    return this.api.post<Bid>(this.endpoints.createBid(), bid, {});
  }

  deleteBid(id: number): Observable<{ message: string }> {
    return this.api.delete<{ message: string }>(this.endpoints.deleteBid(id), {});
  }
}
