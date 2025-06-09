import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeroDetailMovieComponent } from '../../components/hero/hero-detail-movie/hero-detail-movie.component';

@Component({
  selector: 'app-detail-movie',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, HeroDetailMovieComponent],
  templateUrl: './detail-movie.component.html',
  styleUrl: './detail-movie.component.css',
})
export class DetailMovieComponent {}
