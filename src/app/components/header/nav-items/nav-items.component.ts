import { NgFor, NgForOf, NgIf } from '@angular/common';
import { Component, input, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  genreItemsData,
  nationItemsData,
  navItemsData,
} from '../../../constants/data';

@Component({
  selector: 'app-nav-items',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './nav-items.component.html',
  styleUrl: './nav-items.component.css',
})
export class NavItemsComponent {
  navItems = navItemsData;
  genreItems = genreItemsData;
  nationItems = nationItemsData;

  isMobileTablet = input<boolean>(false);

  openCatModal = false;
  openGenreModal = false;
  openNationModal = false;

  toggleCatModal() {
    this.openCatModal = !this.openCatModal;
    this.openGenreModal = false;
    this.openNationModal = false;
  }

  toggleGenreModal() {
    this.openGenreModal = !this.openGenreModal;
    this.openCatModal = false;
    this.openNationModal = false;
  }

  toggleNationModal() {
    this.openNationModal = !this.openNationModal;
    this.openCatModal = false;
    this.openGenreModal = false;
  }
}
