import { Component, input, Input } from '@angular/core';
import { DetailHeroComponent } from '../detail-hero/detail-hero.component';

@Component({
  selector: 'app-hero-detail-movie',
  standalone: true,
  imports: [DetailHeroComponent],
  templateUrl: './hero-detail-movie.component.html',
  styleUrl: './hero-detail-movie.component.css',
})
export class HeroDetailMovieComponent {
  slug = input<string>('');
}
