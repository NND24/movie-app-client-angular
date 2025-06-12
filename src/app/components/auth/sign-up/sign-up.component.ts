import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, inject, output, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);

  closeSignUpEvent = output<boolean>();
  openLoginEvent = output<boolean>();
  showPassword = false;

  closeSignUpModel() {
    this.closeSignUpEvent.emit(false);
  }

  openLoginModel() {
    this.openLoginEvent.emit(true);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  registerForm!: FormGroup;

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get name() {
    return this.registerForm.get('name');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched;
      return;
    }

    const name = this.registerForm.get('name')?.value ?? '';
    const email = this.registerForm.get('email')?.value ?? '';
    const password = this.registerForm.get('password')?.value ?? '';

    this.authService.register(name, email, password).subscribe({
      next: (res) => {
        Swal.fire('Đăng ký thành công!', '', 'success');
        this.closeSignUpEvent.emit(false);
        this.openLoginEvent.emit(true);
      },
    });
  }
}
