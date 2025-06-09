import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { MovieResponse } from '../models/IMovies';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  getNewUpdatedMovie(page: number): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(
      `${environment.movieApiUrl}/danh-sach/phim-moi-cap-nhat?page=${page}`
    );
  }

  getMovieByCategory(
    category: string,
    page: number,
    sortField: string,
    filterGenre: string,
    country: string,
    year: string
  ) {
    return this.http.get(
      `${environment.movieApiUrl}/danh-sach/${category}?page=${page}&sort_field=${sortField}&category=${filterGenre}&country=${country}&year=${year}`
    );
  }

  getMovieByGenre(genre: string, page: number) {
    return this.http.get(
      `${environment.movieApiUrl}/the-loai/${genre}?page=${page}`
    );
  }

  getMovieByNation(nation: string, page: number) {
    return this.http.get(
      `${environment.movieApiUrl}/quoc-gia/${nation}?page=${page}`
    );
  }

  getMovieBySearch(search: string, page: number) {
    return this.http.get(
      `${environment.movieApiUrl}/tim-kiem?keyword=${search}&page=${page}`
    );
  }

  getDetailMovie(slug: string) {
    return this.http.get(`${environment.movieApiUrl}phim/${slug}`);
  }
}
