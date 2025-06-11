import { Component, EventEmitter, Output } from '@angular/core';
import { HeaderComponent } from '../../header/header/header.component';
import { NgIf } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { NavigationEnd, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-change-profile',
  standalone: true,
  imports: [HeaderComponent, NgIf, ReactiveFormsModule],
  templateUrl: './change-profile.component.html',
  styleUrl: './change-profile.component.css',
})
export class ChangeProfileComponent {
  user: any;
  @Output() changeEvent = new EventEmitter<boolean>(false);
  profileForm!: FormGroup;
  avatar!: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });

    this.userService.user$.subscribe((data: any) => {
      this.user = data;

      this.profileForm = this.fb.group({
        name: [data.name, [Validators.required]],
        email: [data.email],
      });
    });
  }

  switchPage() {
    this.changeEvent.emit(false);
  }

  onSubmit() {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const name = this.profileForm.get('name')?.value ?? '';
    this.userService.editProfile(name).subscribe((res: any) => {
      localStorage.setItem('user', JSON.stringify(res));
      this.userService.setUser(res.user);
    });
  }

  imageHandler(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (fileReader.readyState === 2) {
          const base64 = fileReader.result as string;
          this.updateAvatar(base64);
        }
      };
      fileReader.readAsDataURL(file);
    }
  }

  updateAvatar(base64: string): void {
    this.avatar = base64;
    this.userService.updateAvatar(this.avatar).subscribe((res: any) => {
      localStorage.setItem('user', JSON.stringify(res));
      this.userService.setUser(res.user);
    });
  }
}
