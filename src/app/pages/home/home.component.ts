import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header/header.component';
import { HeroComponent } from '../../components/hero/hero/hero.component';
import { MovieService } from '../../services/movie.service';
import { genreItemsData, navItemsData } from '../../constants/data';
import { RouterModule } from '@angular/router';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { MovieSliderComponent } from '../../components/movie/movie-slider/movie-slider.component';
import { MovieCategoryResponse } from '../../models/IMovies';
import { forkJoin } from 'rxjs';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    HeroComponent,
    MovieSliderComponent,
    FooterComponent,
    RouterModule,
    NgForOf,
    NgIf,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  movies: any[] = [];
  navItems = navItemsData;
  genreItems = genreItemsData;
  initialSliders = 2;
  incrementSliders = 2;
  visibleCategorySliders = 2;
  visibleGenreSliders = 2;
  catQueries: MovieCategoryResponse[] = [];
  genreQueries: MovieCategoryResponse[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.movieService.getNewUpdatedMovie(1).subscribe({
      next: (res) => {
        this.movies = res.items;
      },
    });

    const navRequests = this.navItems.map((nav) =>
      this.movieService.getMovieByCategory(nav.slug, 1, '', '', '', '')
    );

    forkJoin(navRequests).subscribe((results) => {
      this.catQueries = results;
    });

    const genreRequests = this.genreItems.map((genre) =>
      this.movieService.getMovieByGenre(genre.slug, 1)
    );

    forkJoin(genreRequests).subscribe((results) => {
      this.genreQueries = results;
    });
  }

  loadMoreCategorySliders() {
    this.visibleCategorySliders += 2;
  }

  hideCategorySliders() {
    this.visibleCategorySliders = 2;
  }

  loadMoreGenreSliders() {
    this.visibleGenreSliders += 2;
  }

  hideGenreSliders() {
    this.visibleGenreSliders = 2;
  }
}
