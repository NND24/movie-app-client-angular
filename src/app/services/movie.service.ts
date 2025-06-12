import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, shareReplay } from 'rxjs';
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
  http = inject(HttpClient);
  private cache = new Map<
    string,
    { data: Observable<any>; expiresAt: number }
  >();
  private TTL = 60 * 60 * 1000;

  getNewUpdatedMovie(page: number): Observable<MovieResponse> {
    const key = `newUpdatedMovie-${page}`;
    const now = Date.now();

    const cached = this.cache.get(key);

    if (cached && cached.expiresAt > now) {
      return cached.data;
    }

    const request = this.http
      .get<MovieResponse>(
        `${environment.movieApiUrl}/danh-sach/phim-moi-cap-nhat?page=${page}`
      )
      .pipe(shareReplay(1));

    this.cache.set(key, {
      data: request,
      expiresAt: now + this.TTL,
    });

    return request;
  }

  getMovieByCategory(
    category: string,
    page: number,
    sortField: string,
    filterGenre: string,
    country: string,
    year: string
  ): Observable<MovieCategoryResponse> {
    const key = `category-${category}-${page}-${sortField}-${filterGenre}-${country}-${year}`;
    const now = Date.now();

    const cached = this.cache.get(key);

    if (cached && cached.expiresAt > now) {
      return cached.data;
    }

    const request = this.http
      .get<MovieCategoryResponse>(
        `${environment.movieApiUrl}/v1/api/danh-sach/${category}?page=${page}&sort_field=${sortField}&category=${filterGenre}&country=${country}&year=${year}`
      )
      .pipe(shareReplay(1));

    this.cache.set(key, {
      data: request,
      expiresAt: now + this.TTL,
    });

    return request;
  }

  getMovieByGenre(
    genre: string,
    page: number
  ): Observable<MovieCategoryResponse> {
    const key = `genre-${genre}-${page}`;
    const now = Date.now();

    const cached = this.cache.get(key);

    if (cached && cached.expiresAt > now) {
      return cached.data;
    }

    const request = this.http
      .get<MovieCategoryResponse>(
        `${environment.movieApiUrl}/v1/api/the-loai/${genre}?page=${page}`
      )
      .pipe(shareReplay(1));

    this.cache.set(key, {
      data: request,
      expiresAt: now + this.TTL,
    });

    return request;
  }

  getMovieByNation(
    nation: string,
    page: number
  ): Observable<MovieCategoryResponse> {
    const key = `nation-${nation}-${page}`;
    const now = Date.now();

    const cached = this.cache.get(key);

    if (cached && cached.expiresAt > now) {
      return cached.data;
    }

    const request = this.http
      .get<MovieCategoryResponse>(
        `${environment.movieApiUrl}/v1/api/quoc-gia/${nation}?page=${page}`
      )
      .pipe(shareReplay(1));

    this.cache.set(key, {
      data: request,
      expiresAt: now + this.TTL,
    });

    return request;
  }

  getMovieBySearch(
    search: string,
    page: number
  ): Observable<MovieCategoryResponse> {
    const key = `search-${search}-${page}`;
    const now = Date.now();

    const cached = this.cache.get(key);

    if (cached && cached.expiresAt > now) {
      return cached.data;
    }

    const request = this.http
      .get<MovieCategoryResponse>(
        `${environment.movieApiUrl}/v1/api/tim-kiem?keyword=${search}&page=${page}`
      )
      .pipe(shareReplay(1));

    this.cache.set(key, {
      data: request,
      expiresAt: now + this.TTL,
    });

    return request;
  }

  getDetailMovie(slug: string): Observable<DetailMovieResponse> {
    const key = `detail-${slug}`;
    const now = Date.now();

    const cached = this.cache.get(key);

    if (cached && cached.expiresAt > now) {
      return cached.data;
    }

    const request = this.http
      .get<DetailMovieResponse>(`${environment.movieApiUrl}/phim/${slug}`)
      .pipe(shareReplay(1));

    this.cache.set(key, {
      data: request,
      expiresAt: now + this.TTL,
    });

    return request;
  }
}
