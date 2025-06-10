import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MovieService } from '../../../services/movie.service';
import { Movie } from '../../../models/IMovies';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-history-movie-card',
  standalone: true,
  imports: [RouterModule, NgIf],
  templateUrl: './history-movie-card.component.html',
  styleUrl: './history-movie-card.component.css',
})
export class HistoryMovieCardComponent {
  @Input() slug: string = '';
  @Input() lasted_ep: any;
  movie!: Movie;

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.movieService.getDetailMovie(this.slug).subscribe({
      next: (res) => {
        this.movie = res.movie;
      },
    });
  }
}
