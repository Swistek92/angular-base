import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PopupMode } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class PopupControllerService<T = any> {
  private modeSubject = new BehaviorSubject<PopupMode>(null);
  private dataSubject = new BehaviorSubject<T | null>(null);

  mode$ = this.modeSubject.asObservable();
  data$ = this.dataSubject.asObservable();

  open(mode: PopupMode, data?: T): void {
    this.modeSubject.next(mode);
    this.dataSubject.next(data ?? null);
  }

  close(): void {
    this.modeSubject.next(null);
    this.dataSubject.next(null);
  }
}
