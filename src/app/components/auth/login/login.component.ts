import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, output, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  closeLoginEvent = output<boolean>();
  openSignUpEvent = output<boolean>();
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
      password: ['', [Validators.required]],
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
      next: (res: any) => {
        this.userService.setUser(res);
        this.closeLoginEvent.emit(false);
        Swal.fire('Đăng nhập thành công!', '', 'success');
      },
    });
  }
}
