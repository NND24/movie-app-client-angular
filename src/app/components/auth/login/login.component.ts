import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgClass, NgIf, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
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

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {}
}
