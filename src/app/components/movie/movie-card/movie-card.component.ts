import { Component, Input } from '@angular/core';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { RemoveHtmlTagsPipe } from '../../../pipes/remove-html-tags.pipe';
import { Movie } from '../../../models/IMovies';
import { MovieService } from '../../../services/movie.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [NgIf, NgForOf, RemoveHtmlTagsPipe, RouterModule, NgClass],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css',
})
export class MovieCardComponent {
  isHovered: boolean = false;
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

  handleMouseEnter() {
    this.isHovered = true;
  }

  handleMouseLeave() {
    this.isHovered = false;
  }

  addToFollowed() {}
}
