import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
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
