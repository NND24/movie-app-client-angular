import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [NgClass],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  @Output() closeSignUpEvent = new EventEmitter<boolean>();
  @Output() openLoginEvent = new EventEmitter<boolean>();
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
}
