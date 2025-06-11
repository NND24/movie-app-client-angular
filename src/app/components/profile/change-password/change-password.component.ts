import { Component, EventEmitter, Output } from '@angular/core';
import { HeaderComponent } from '../../header/header/header.component';
import { NgIf } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { NavigationEnd, Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [HeaderComponent, NgIf, ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {
  user: any;
  @Output() changeEvent = new EventEmitter<boolean>(false);
  passwordForm!: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  matchPasswords(field1: string, field2: string): ValidatorFn {
    return (form: AbstractControl): ValidationErrors | null => {
      const control1 = form.get(field1);
      const control2 = form.get(field2);

      if (!control1 || !control2) return null;

      return control1.value === control2.value
        ? null
        : { passwordMismatch: true };
    };
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });

    this.userService.user$.subscribe((data) => {
      this.user = data;
    });

    this.passwordForm = this.fb.group(
      {
        oldPassword: ['', [Validators.required]],
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      { validators: this.matchPasswords('newPassword', 'confirmPassword') }
    );
  }

  get oldPassword() {
    return this.passwordForm.get('oldPassword');
  }

  get newPassword() {
    return this.passwordForm.get('newPassword');
  }

  get confirmPassword() {
    return this.passwordForm.get('confirmPassword');
  }

  switchPage() {
    this.changeEvent.emit(true);
  }

  onSubmit() {
    const oldPassword = this.passwordForm.get('oldPassword')?.value;
    const newPassword = this.passwordForm.get('newPassword')?.value;

    this.userService
      .updatePassword(oldPassword, newPassword)
      .subscribe((res: any) => {
        localStorage.setItem('user', JSON.stringify(res));
        this.userService.setUser(res.user);
      });
  }
}
