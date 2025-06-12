import { Component, computed, effect, inject } from '@angular/core';
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
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { RemoveHtmlTagsPipe } from '../../pipes/remove-html-tags.pipe';
import { CommentComponent } from '../../components/movie/comment/comment.component';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Subject, takeUntil } from 'rxjs';

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
    NgForOf,
    NgClass,
  ],
  templateUrl: './detail-movie.component.html',
  styleUrl: './detail-movie.component.css',
})
export class DetailMovieComponent {
  private movieService = inject(MovieService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private userService = inject(UserService);

  slug: string = '';
  movie!: DetailMovieResponse;
  separatedData!: Record<string, ServerData[]>;
  separatedEntries: { serverName: string; episodes: ServerData[] }[] = [];
  user = computed(() => this.userService.user());

  watchedMovieItem = {
    watched_eps: [''],
  };

  private destroy$ = new Subject<void>();

  constructor() {
    effect(() => {
      if (this.user()) {
        this.watchedMovieItem = this.user()?.history.find(
          (item: any) => item.movie_slug === this.slug
        );
        if (!this.watchedMovieItem) {
          this.watchedMovieItem = {
            watched_eps: [''],
          };
        }
      } else {
        this.watchedMovieItem = {
          watched_eps: [''],
        };
      }
    });
  }

  ngOnInit() {
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });

    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const slugParam = params.get('slug');

      if (slugParam) {
        this.slug = slugParam;

        this.movieService
          .getDetailMovie(this.slug)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (res) => {
              this.movie = res;

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
    if (this.user()) {
      this.userService
        .addToHistory(this.slug, epName)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res: any) => {
          this.userService.setUser(res);
        });
    } else {
      console.log('Chưa đăng nhập');
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
