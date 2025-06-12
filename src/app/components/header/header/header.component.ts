import { Component, computed, HostListener, inject } from '@angular/core';
import { NavItemsComponent } from '../nav-items/nav-items.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { LoginComponent } from '../../auth/login/login.component';
import { SignUpComponent } from '../../auth/sign-up/sign-up.component';
import { Router, RouterModule } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    NavItemsComponent,
    SidebarComponent,
    LoginComponent,
    SignUpComponent,
    NgIf,
    NgClass,
    FormsModule,
    MatIconModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  private userService = inject(UserService);

  user = computed(() => this.userService.user());
  openModal: boolean = false;
  openSidebar: boolean = false;
  openLogin: boolean = false;
  openSignUp: boolean = false;
  isProfile: boolean = false;
  activeScroll: boolean = false;
  search: string = '';

  toggleModal() {
    this.openModal = !this.openModal;
  }

  toggleSidebar() {
    this.openSidebar = !this.openSidebar;
  }

  onToggleLogin(data: boolean) {
    this.openLogin = data;
  }

  onToggleSignUp(data: boolean) {
    this.openSignUp = data;
  }

  onToggleSidebar(data: boolean) {
    this.openSidebar = data;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.activeScroll = window.scrollY > 80;
  }

  handleSearch() {
    this.router.navigate(['/tim-kiem', this.search], {
      queryParams: {
        page: 1,
      },
    });
  }

  handleLogout() {
    this.authService.logout().subscribe((res) => {
      this.userService.clearUser();
      this.router.navigateByUrl('/');
    });
  }
}
