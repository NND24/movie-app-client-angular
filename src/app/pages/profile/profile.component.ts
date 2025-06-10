import { Component } from '@angular/core';
import { ChangePasswordComponent } from '../../components/profile/change-password/change-password.component';
import { ChangeProfileComponent } from '../../components/profile/change-profile/change-profile.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ChangePasswordComponent, ChangeProfileComponent, NgIf],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  editIfo: boolean = false;
}
