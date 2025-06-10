import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { DetailHeroComponent } from '../detail-hero/detail-hero.component';
import { NgForOf } from '@angular/common';
import { MovieService } from '../../../services/movie.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [DetailHeroComponent, NgForOf],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeroComponent {
  @Input() items: any[] = [];

  constructor(private movieService: MovieService) {}
}
