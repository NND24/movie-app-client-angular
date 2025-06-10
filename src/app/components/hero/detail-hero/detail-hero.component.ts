import { NgForOf, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MovieService } from '../../../services/movie.service';
import { Movie } from '../../../models/IMovies';
import { RemoveHtmlTagsPipe } from '../../../pipes/remove-html-tags.pipe';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-detail-hero',
  standalone: true,
  imports: [
    RouterModule,
    NgIf,
    NgForOf,
    RemoveHtmlTagsPipe,
    DetailHeroComponent,
  ],
  templateUrl: './detail-hero.component.html',
  styleUrl: './detail-hero.component.css',
})
export class DetailHeroComponent {
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

  addToFollowed() {
    if (this.user) {
      this.userService.addMovieToFavorite(this.slug).subscribe((res: any) => {
        localStorage.setItem('user', JSON.stringify(res));
        this.userService.setUser(res.user);
      });
    } else {
      console.log('Chưa đăng nhập');
    }
  }
}
