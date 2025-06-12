import {
  Component,
  computed,
  effect,
  EventEmitter,
  Output,
} from '@angular/core';
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
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-profile',
  standalone: true,
  imports: [HeaderComponent, NgIf, ReactiveFormsModule],
  templateUrl: './change-profile.component.html',
  styleUrl: './change-profile.component.css',
})
export class ChangeProfileComponent {
  user = computed(() => this.userService.user());
  @Output() changeEvent = new EventEmitter<boolean>(false);
  profileForm!: FormGroup;
  avatar!: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required]],
      email: [''],
    });

    effect(() => {
      const user = this.user();
      if (user) {
        this.profileForm.patchValue({
          name: user.name,
          email: user.email,
        });
      }
    });
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
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
      Swal.fire('Đổi tên thành công!', '', 'success');
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
      Swal.fire('Đổi ảnh đại diện thành công!', '', 'success');
    });
  }
}
