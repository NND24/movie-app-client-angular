import { NgIf, NgOptimizedImage } from '@angular/common';
import { Component, computed, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MovieService } from '../../../services/movie.service';
import { Movie } from '../../../models/IMovies';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-followed-movie-card',
  standalone: true,
  imports: [NgIf, RouterModule, NgOptimizedImage],
  templateUrl: './followed-movie-card.component.html',
  styleUrl: './followed-movie-card.component.css',
})
export class FollowedMovieCardComponent {
  @Input() slug: string = '';
  movie!: Movie;
  user = computed(() => this.userService.user());

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
  }

  removeFromFollowed() {
    if (this.user()) {
      Swal.fire({
        title: 'Bạn có chắc muốn xóa phim này khỏi theo dõi?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy',
      }).then((result) => {
        if (result.isConfirmed) {
          this.userService
            .removeMovieFromFavorite(this.slug)
            .subscribe((res: any) => {
              localStorage.setItem('user', JSON.stringify(res));
              this.userService.setUser(res.user);
              Swal.fire('Xóa khỏi theo dõi thành công!', '', 'success');
            });
        }
      });
    } else {
      Swal.fire('Vui lòng đăng nhập để tiếp tục!', '', 'error');
    }
  }
}
