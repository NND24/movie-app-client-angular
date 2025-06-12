import { NgForOf, NgIf } from '@angular/common';
import { Component, computed, inject, input, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MovieService } from '../../../services/movie.service';
import { Movie } from '../../../models/IMovies';
import { RemoveHtmlTagsPipe } from '../../../pipes/remove-html-tags.pipe';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';
import { TrimPipe } from '../../../pipes/trim.pipe';
import { StarComponent } from '../../star/star.component';

@Component({
  selector: 'app-detail-hero',
  standalone: true,
  imports: [
    RouterModule,
    RemoveHtmlTagsPipe,
    DetailHeroComponent,
    TrimPipe,
    StarComponent,
  ],
  templateUrl: './detail-hero.component.html',
  styleUrl: './detail-hero.component.css',
})
export class DetailHeroComponent {
  private userService = inject(UserService);
  private movieService = inject(MovieService);

  slug = input<string>('');
  movie!: Movie;
  user = computed(() => this.userService.user());

  ngOnInit() {
    this.movieService.getDetailMovie(this.slug()).subscribe({
      next: (res) => {
        this.movie = res.movie;
      },
    });
  }

  addToFollowed() {
    if (this.user()) {
      this.userService.addMovieToFavorite(this.slug()).subscribe({
        next: (res: any) => {
          this.userService.setUser(res);
        },
        error: (res) => {
          console.log(res);
        },
      });
    } else {
      Swal.fire('Vui lòng đăng nhập để tiếp tục!', '', 'error');
    }
  }
}
