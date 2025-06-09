import { Component, HostListener } from '@angular/core';
import { NavItemsComponent } from '../nav-items/nav-items.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { LoginComponent } from '../../auth/login/login.component';
import { SignUpComponent } from '../../auth/sign-up/sign-up.component';
import { RouterModule } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';

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
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  user = false;
  openModel: boolean = false;
  openLogin: boolean = false;
  openSignUp: boolean = false;
  isProfile: boolean = false;
  activeScroll: boolean = false;

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
}
