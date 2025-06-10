import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MovieService } from '../../../services/movie.service';
import { Movie } from '../../../models/IMovies';

@Component({
  selector: 'app-followed-movie-card',
  standalone: true,
  imports: [NgIf, RouterModule],
  templateUrl: './followed-movie-card.component.html',
  styleUrl: './followed-movie-card.component.css',
})
export class FollowedMovieCardComponent {
  @Input() slug: string = '';
  movie!: Movie;

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.movieService.getDetailMovie(this.slug).subscribe({
      next: (res) => {
        this.movie = res.movie;
      },
    });
  }

  removeFromFollowed() {}
}
