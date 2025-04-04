import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../services/auth.service';
import { PopupWrapperComponent } from '../../components/popup/popup-wrapper/popup-wrapper.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    PopupWrapperComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  visible = false;
  submitted = false;

  form!: FormGroup;

  private fb = inject(FormBuilder);
  private auth = inject(AuthService);

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  show(): void {
    this.visible = true;
  }

  hide(): void {
    this.visible = false;
    this.submitted = false;
    this.form.reset();
  }

  login(): void {
    this.submitted = true;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.auth.login(this.form.value).subscribe({
      next: res => {
        console.log(res);
        this.auth.setTokens(res.accessToken, res.refreshToken);
        this.auth.autoLogin();
        this.hide();
      },
      error: () => {
        alert('Błędny login lub hasło');
      },
    });
  }

  get f() {
    return this.form.controls;
  }
}
