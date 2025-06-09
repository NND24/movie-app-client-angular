import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgClass, NgIf, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private authService: AuthService, private fb: FormBuilder) {}

  @Output() closeLoginEvent = new EventEmitter<boolean>();
  @Output() openSignUpEvent = new EventEmitter<boolean>();
  showPassword: boolean = false;

  closeLoginModel() {
    this.closeLoginEvent.emit(false);
  }

  openSignUpModel() {
    this.openSignUpEvent.emit(true);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  loginForm!: FormGroup;

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const email = this.loginForm.get('email')?.value ?? '';
    const password = this.loginForm.get('password')?.value ?? '';

    this.authService.login(email, password).subscribe({
      next: (res) => {
        console.log('Đăng nhập thành công: ', res);
      },
    });
  }
}
