import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetailMovieComponent } from './pages/detail-movie/detail-movie.component';
import { WatchMovieComponent } from './pages/watch-movie/watch-movie.component';
import { ListMovieComponent } from './pages/list-movie/list-movie.component';
import { FollowedMovieComponent } from './pages/followed-movie/followed-movie.component';
import { HistoryComponent } from './pages/history/history.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'phim/:slug', component: DetailMovieComponent },
  { path: 'phim/:slug/:episode', component: WatchMovieComponent },
  { path: 'danh-sach/:category', component: ListMovieComponent },
  { path: 'the-loai/:genre', component: ListMovieComponent },
  { path: 'quoc-gia/:nation', component: ListMovieComponent },
  { path: 'tim-kiem/:search', component: ListMovieComponent },
  {
    path: 'theo-doi',
    component: FollowedMovieComponent,
    canActivate: [authGuard],
  },
  { path: 'lich-su', component: HistoryComponent, canActivate: [authGuard] },
  {
    path: 'trang-ca-nhan',
    component: ProfileComponent,
    canActivate: [authGuard],
  },
  { path: '**', component: NotFoundComponent },
];
