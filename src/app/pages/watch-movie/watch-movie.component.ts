import { Component, computed, effect } from '@angular/core';
import { HeaderComponent } from '../../components/header/header/header.component';
import { CommentComponent } from '../../components/movie/comment/comment.component';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { MoviePlayerComponent } from '../../components/movie/movie-player/movie-player.component';
import { RemoveHtmlTagsPipe } from '../../pipes/remove-html-tags.pipe';
import { DetailMovieResponse, Episode, ServerData } from '../../models/IMovies';
import { MovieService } from '../../services/movie.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UserService } from '../../services/user.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-watch-movie',
  standalone: true,
  imports: [
    HeaderComponent,
    CommentComponent,
    NgIf,
    NgForOf,
    NgClass,
    RouterModule,
    MoviePlayerComponent,
    RemoveHtmlTagsPipe,
  ],
  templateUrl: './watch-movie.component.html',
  styleUrl: './watch-movie.component.css',
})
export class WatchMovieComponent {
  slug: string = '';
  episode: string = '';
  decodedServerName: string = '';
  selectedServer = '1';
  movie!: DetailMovieResponse;
  separatedData!: Record<string, ServerData[]>;
  separatedEntries: { serverName: string; episodes: ServerData[] }[] = [];
  selectedEpisode?: ServerData;
  user = computed(() => this.userService.user());

  watchedMovieItem = {
    watched_eps: [''],
  };

  private destroy$ = new Subject<void>();

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private userService: UserService
  ) {
    effect(() => {
      if (this.user()?.history) {
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

  updateSelectedEpisode() {
    const serverKey = this.decodedServerName || this.selectedServer;
    const episodesForServer = this.separatedData
      ? this.separatedData[serverKey] || []
      : [];
    this.selectedEpisode = episodesForServer.find(
      (ep) => ep.name === this.episode
    );
  }

  ngOnInit() {
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });

    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const slugParam = params.get('slug');
      const episodeParam = params.get('episode');

      if (slugParam && episodeParam) {
        this.slug = slugParam;
        this.episode = episodeParam;

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

              this.updateSelectedEpisode();
            },
            error: (err) => {
              console.error('Lỗi lấy chi tiết phim:', err);
            },
          });
      }
    });

    this.route.queryParamMap
      .pipe(takeUntil(this.destroy$))
      .subscribe((queryParams) => {
        const serverNameFromUrl = queryParams.get('server-name');
        this.decodedServerName = serverNameFromUrl
          ? decodeURIComponent(serverNameFromUrl)
          : '';
        this.selectedServer = queryParams.get('server') || '1';

        this.movieService.getDetailMovie(this.slug).subscribe({
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

            this.updateSelectedEpisode();
          },
          error: (err) => {
            console.error('Lỗi lấy chi tiết phim:', err);
          },
        });
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

  setSelectedServer(server: string) {
    this.selectedServer = server;
    this.decodedServerName = server;
    this.updateSelectedEpisode();
  }

  getSafeUrl(url: string): SafeResourceUrl {
    const hasQuery = url.includes('?');
    const finalUrl = hasQuery ? `${url}&autoplay=0` : `${url}?autoplay=0`;

    return this.sanitizer.bypassSecurityTrustResourceUrl(finalUrl);
  }

  trackByServer(
    index: number,
    item: { serverName: string; episodes: ServerData[] }
  ) {
    return item.serverName;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
