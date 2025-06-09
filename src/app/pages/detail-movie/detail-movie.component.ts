import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeroDetailMovieComponent } from '../../components/hero/hero-detail-movie/hero-detail-movie.component';
import { MovieService } from '../../services/movie.service';
import {
  DetailMovieResponse,
  Episode,
  Movie,
  ServerData,
} from '../../models/IMovies';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RemoveHtmlTagsPipe } from '../../pipes/remove-html-tags.pipe';
import { CommentComponent } from '../../components/movie/comment/comment.component';
import { NgClass, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-detail-movie',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    HeroDetailMovieComponent,
    RouterModule,
    RemoveHtmlTagsPipe,
    CommentComponent,
    NgIf,
    NgForOf,
    NgClass,
  ],
  templateUrl: './detail-movie.component.html',
  styleUrl: './detail-movie.component.css',
})
export class DetailMovieComponent {
  slug: string = '';
  movie!: DetailMovieResponse;
  separatedData!: Record<string, ServerData[]>;
  separatedEntries: { serverName: string; episodes: ServerData[] }[] = [];

  watchedMovieItem = {
    watched_eps: ['1', '2'],
  };

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const slugParam = params.get('slug');

      if (slugParam) {
        this.slug = slugParam;

        this.movieService.getDetailMovie(this.slug).subscribe({
          next: (res) => {
            this.movie = res;

            console.log(this.movie);

            this.separatedData = this.movie.episodes.reduce(
              (acc: Record<string, ServerData[]>, server: Episode) => {
                acc[server.server_name] = server.server_data;
                return acc;
              },
              {} as Record<string, ServerData[]>
            );

            this.separatedEntries = Object.entries(this.separatedData).map(
              ([serverName, episodes]) => ({ serverName, episodes })
            );
          },
          error: (err) => {
            console.error('Lỗi lấy chi tiết phim:', err);
          },
        });
      }
    });
  }

  addHistory(epName: string) {
    console.log('Đã xem tập:', epName);
  }
}
