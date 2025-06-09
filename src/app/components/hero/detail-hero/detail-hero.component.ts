import { NgForOf, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MovieService } from '../../../services/movie.service';
import { Movie } from '../../../models/IMovies';
import { RemoveHtmlTagsPipe } from '../../../pipes/remove-html-tags.pipe';

@Component({
  selector: 'app-detail-hero',
  standalone: true,
  imports: [RouterModule, NgIf, NgForOf, RemoveHtmlTagsPipe],
  templateUrl: './detail-hero.component.html',
  styleUrl: './detail-hero.component.css',
})
export class DetailHeroComponent {
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

  addToFollowed() {}
}
