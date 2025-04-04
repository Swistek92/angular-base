import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="loading" class="loading-wrapper">
      <img src="assets/logo.svg" alt="logo" class="loading-logo" />
    </div>
  `,
  styles: [
    `
      .loading-wrapper {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .loading-logo {
        width: 80vw;
        height: auto;
        animation: spin 1.5s linear infinite;
      }

      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class LoadingComponent {
  @Input() loading = false;
}
