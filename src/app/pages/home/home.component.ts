import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header/header.component';
import { HeroComponent } from '../../components/hero/hero/hero.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, HeroComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
