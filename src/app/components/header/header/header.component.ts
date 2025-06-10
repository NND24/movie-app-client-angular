import { Component, HostListener } from '@angular/core';
import { NavItemsComponent } from '../nav-items/nav-items.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { LoginComponent } from '../../auth/login/login.component';
import { SignUpComponent } from '../../auth/sign-up/sign-up.component';
import { Router, RouterModule } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';

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
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  user: any;
  openModel: boolean = false;
  openLogin: boolean = false;
  openSignUp: boolean = false;
  isProfile: boolean = false;
  activeScroll: boolean = false;
  search: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.openModel = false;
    this.userService.user$.subscribe((data) => {
      this.user = data;
    });

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.userService.setUser(JSON.parse(storedUser).user);
    }
  }

  toggleModel() {
    this.openModel = !this.openModel;
  }

  onToggleLogin(data: boolean) {
    this.openLogin = data;
  }

  onToggleSignUp(data: boolean) {
    this.openSignUp = data;
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
      localStorage.removeItem('user');
    });
  }
}
