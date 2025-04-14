import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { AuthStoreService } from '../../user-auth/auth-store.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appIsOwner]',
  standalone: true,
})
export class IsOwnerDirective implements OnInit, OnDestroy {
  private templateRef = inject(TemplateRef<any>);
  private viewContainer = inject(ViewContainerRef);
  private authStore = inject(AuthStoreService);

  private sub: Subscription | null = null;

  @Input('appIsOwner') ownerId!: number;

  ngOnInit(): void {
    this.sub = this.authStore.user$.subscribe(user => {
      const isOwner = user?.id === this.ownerId;
      this.viewContainer.clear();

      if (isOwner) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
// <ng-container *ngIf="authStore.user$ | async as user">
//   <button *ngIf="user.id === item.userId">Usuń</button>
// </ng-container>
