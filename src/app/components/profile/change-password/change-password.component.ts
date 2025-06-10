import { Component, EventEmitter, Output } from '@angular/core';
import { HeaderComponent } from '../../header/header/header.component';
import { NgIf } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [HeaderComponent, NgIf],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {
  user: any;
  @Output() changeEvent = new EventEmitter<boolean>(false);

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });

    this.userService.user$.subscribe((data) => {
      this.user = data;
    });
  }

  switchPage() {
    this.changeEvent.emit(true);
  }
}
