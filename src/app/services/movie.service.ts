import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import {
  DetailMovieResponse,
  Movie,
  MovieCategoryResponse,
  MovieResponse,
} from '../models/IMovies';

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
  ): Observable<MovieCategoryResponse> {
    return this.http.get<MovieCategoryResponse>(
      `${environment.movieApiUrl}/v1/api/danh-sach/${category}?page=${page}&sort_field=${sortField}&category=${filterGenre}&country=${country}&year=${year}`
    );
  }

  getMovieByGenre(
    genre: string,
    page: number
  ): Observable<MovieCategoryResponse> {
    return this.http.get<MovieCategoryResponse>(
      `${environment.movieApiUrl}/v1/api/the-loai/${genre}?page=${page}`
    );
  }

  getMovieByNation(
    nation: string,
    page: number
  ): Observable<MovieCategoryResponse> {
    return this.http.get<MovieCategoryResponse>(
      `${environment.movieApiUrl}/v1/api/quoc-gia/${nation}?page=${page}`
    );
  }

  getMovieBySearch(
    search: string,
    page: number
  ): Observable<MovieCategoryResponse> {
    return this.http.get<MovieCategoryResponse>(
      `${environment.movieApiUrl}/v1/api/tim-kiem?keyword=${search}&page=${page}`
    );
  }

  getDetailMovie(slug: string): Observable<DetailMovieResponse> {
    return this.http.get<DetailMovieResponse>(
      `${environment.movieApiUrl}/phim/${slug}`
    );
  }
}
