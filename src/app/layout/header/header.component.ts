import { Component, inject, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../../components/popup/login/login.component';
import { ButtonModule } from 'primeng/button';
import { AuthStoreService } from '../../services/user-auth/auth-store.service';
import { AsyncPipe, NgIf } from '@angular/common';
@Component({
  selector: 'app-header',
  imports: [RouterModule, ButtonModule, LoginComponent, AsyncPipe, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private authStore = inject(AuthStoreService);
  @ViewChild(LoginComponent) loginModal!: LoginComponent;
  user$ = this.authStore.user$;

  logout() {
    this.authStore.logout();
  }

  openLogin() {
    this.loginModal.show();
  }
  isDarkMode = false;
  constructor() {
    const saved = localStorage.getItem('theme');
    this.isDarkMode = saved === 'dark';
    this.setHtmlClass(this.isDarkMode);
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.setHtmlClass(this.isDarkMode);
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }

  private setHtmlClass(dark: boolean) {
    const html = document.documentElement;
    html.classList.toggle('my-app-dark', dark);
  }
}
