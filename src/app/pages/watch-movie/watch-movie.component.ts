import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header/header.component';
import { CommentComponent } from '../../components/movie/comment/comment.component';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MoviePlayerComponent } from '../../components/movie/movie-player/movie-player.component';
import { RemoveHtmlTagsPipe } from '../../pipes/remove-html-tags.pipe';
import { DetailMovieResponse, Episode, ServerData } from '../../models/IMovies';
import { MovieService } from '../../services/movie.service';

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
  serverFromUrl: string = '1';

  watchedMovieItem = {
    watched_eps: ['1', '2'],
  };

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {}

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
    this.route.paramMap.subscribe((params) => {
      const slugParam = params.get('slug');
      const episodeParam = params.get('episode');
      const serverNameFromUrl = params.get('server-name');
      this.decodedServerName = serverNameFromUrl
        ? decodeURIComponent(serverNameFromUrl)
        : '';
      this.serverFromUrl = params.get('server') || '1';

      if (slugParam && episodeParam) {
        this.slug = slugParam;
        this.episode = episodeParam;

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
      }
    });
  }

  addHistory(epName: string) {
    console.log('Đã xem tập:', epName);
  }

  setSelectedServer(server: string) {
    this.selectedServer = server;
    this.decodedServerName = server;
    this.updateSelectedEpisode();
  }
}
