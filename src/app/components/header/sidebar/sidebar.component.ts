import { Component, computed, EventEmitter, Output } from '@angular/core';
import { NavItemsComponent } from '../nav-items/nav-items.component';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { NgClass, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NavItemsComponent, NgIf, NgClass, FormsModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  user = computed(() => this.userService.user());
  search: string = '';
  openModal: boolean = false;
  @Output() toggleLoginEvent = new EventEmitter<boolean>(false);
  @Output() toggleSidebarEvent = new EventEmitter<boolean>(false);

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.userService.setUser(JSON.parse(storedUser).user);
    }
  }

  toggleModel() {
    this.openModal = !this.openModal;
  }

  onOpenLogin() {
    this.toggleLoginEvent.emit(true);
  }

  onToggleSidebar() {
    this.toggleSidebarEvent.emit(false);
  }

  onToggleModal() {
    this.openModal = !this.openModal;
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
      this.router.navigateByUrl('/');
    });
  }
}
