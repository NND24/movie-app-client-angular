import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MovieService } from '../../../services/movie.service';
import { Movie } from '../../../models/IMovies';
import { UserService } from '../../../services/user.service';

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
  user: any;

  constructor(
    private movieService: MovieService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.movieService.getDetailMovie(this.slug).subscribe({
      next: (res) => {
        this.movie = res.movie;
      },
    });

    this.userService.user$.subscribe((data) => {
      this.user = data;
    });
  }

  removeFromFollowed() {
    if (this.user) {
      this.userService
        .removeMovieFromFavorite(this.slug)
        .subscribe((res: any) => {
          localStorage.setItem('user', JSON.stringify(res));
          this.userService.setUser(res.user);
        });
    } else {
      console.log('Chưa đăng nhập');
    }
  }
}
