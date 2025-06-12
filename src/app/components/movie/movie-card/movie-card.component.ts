import { Component, inject, input, Input, signal } from '@angular/core';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { RemoveHtmlTagsPipe } from '../../../pipes/remove-html-tags.pipe';
import { Movie } from '../../../models/IMovies';
import { MovieService } from '../../../services/movie.service';
import { RouterModule } from '@angular/router';
import { StarComponent } from '../../star/star.component';
import { StarPercentComponent } from '../../star-percent/star-percent.component';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [
    NgForOf,
    RemoveHtmlTagsPipe,
    RouterModule,
    NgClass,
    StarComponent,
    StarPercentComponent,
  ],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css',
})
export class MovieCardComponent {
  private movieService = inject(MovieService);

  isHovered = signal<boolean>(false);
  slug = input<string>('');
  movie!: Movie;

  ngOnInit() {
    this.movieService.getDetailMovie(this.slug()).subscribe({
      next: (res) => {
        this.movie = res.movie;
      },
    });
  }

  handleMouseEnter() {
    this.isHovered.set(true);
  }

  handleMouseLeave() {
    this.isHovered.set(false);
  }

  addToFollowed() {}
}
