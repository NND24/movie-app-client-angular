import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeroComponent } from '../../components/hero/hero/hero.component';
import { MovieCardComponent } from '../../components/movie/movie-card/movie-card.component';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { NavItemsComponent } from '../../components/header/nav-items/nav-items.component';
import {
  genreItemsData,
  nationItemsData,
  navItemsData,
} from '../../constants/data';
import { MovieCategoryResponse } from '../../models/IMovies';
import { MovieService } from '../../services/movie.service';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-movie',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    HeroComponent,
    MovieCardComponent,
    RouterModule,
    NgIf,
    NgForOf,
    NgClass,
    FormsModule,
  ],
  templateUrl: './list-movie.component.html',
  styleUrl: './list-movie.component.css',
})
export class ListMovieComponent {
  navItems = navItemsData;
  genreItems = genreItemsData;
  nationItems = nationItemsData;
  currentYear = new Date().getFullYear();
  years: number[] = [];

  listMovie!: MovieCategoryResponse;
  phimLeData!: MovieCategoryResponse;
  phimBoData!: MovieCategoryResponse;
  phimSapChieuData!: MovieCategoryResponse;

  totalItems!: number;
  totalItemsPerPage!: number;
  totalPages!: number;
  pageNumbers: (number | string)[] = [];
  currentPage: number = 1;

  sortField = '';
  filterGenre = '';
  country = '';
  year = '';

  category!: string;
  genre!: string;
  nation!: string;
  search!: string;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });

    const startYear = 2000;
    const endYear = this.currentYear + 1;
    this.years = Array.from(
      { length: endYear - startYear + 1 },
      (_, i) => endYear - i
    );

    this.route.paramMap.subscribe((params) => {
      this.category = params.get('category') || '';
      this.genre = params.get('genre') || '';
      this.nation = params.get('nation') || '';
      this.search = params.get('search') || '';

      this.fetchData();
    });

    this.route.queryParamMap.subscribe((queryParams) => {
      this.currentPage = parseInt(queryParams.get('page') || '1', 10);
      this.sortField = queryParams.get('sortField') || '';
      this.filterGenre = queryParams.get('category') || '';
      this.country = queryParams.get('country') || '';
      this.year = queryParams.get('year') || '';

      this.fetchData();
    });

    this.movieService
      .getMovieByCategory('sap-chieu', 1, '', '', '', '')
      .subscribe((data) => (this.phimSapChieuData = data));

    this.movieService
      .getMovieByCategory('phim-le', 1, '', '', '', '')
      .subscribe((data) => (this.phimLeData = data));

    this.movieService
      .getMovieByCategory('phim-bo', 1, '', '', '', '')
      .subscribe((data) => (this.phimBoData = data));
  }

  fetchData(): void {
    let fetch$: Observable<MovieCategoryResponse>;

    if (this.category) {
      fetch$ = this.movieService.getMovieByCategory(
        this.category,
        this.currentPage,
        this.sortField,
        this.filterGenre,
        this.country,
        this.year
      );
    } else if (this.genre) {
      fetch$ = this.movieService.getMovieByGenre(this.genre, this.currentPage);
    } else if (this.nation) {
      fetch$ = this.movieService.getMovieByNation(
        this.nation,
        this.currentPage
      );
    } else if (this.search) {
      fetch$ = this.movieService.getMovieBySearch(
        this.search,
        this.currentPage
      );
    } else {
      fetch$ = this.movieService.getMovieByCategory(
        'phim-le',
        this.currentPage,
        '',
        '',
        '',
        ''
      );
    }

    fetch$.subscribe({
      next: (res) => {
        this.listMovie = res;
        this.totalItems = res.data?.params?.pagination.totalItems || 0;
        this.totalItemsPerPage =
          res.data?.params?.pagination.totalItemsPerPage || 1;
        this.totalPages = Math.ceil(this.totalItems / this.totalItemsPerPage);
      },
      error: (err) => {
        console.error('Lỗi gọi API:', err);
      },
      complete: () => {
        this.generatePageNumbers();
      },
    });
  }

  handleFilter() {
    this.router.navigate(['/danh-sach', this.category], {
      queryParams: {
        page: 1,
        sortField: this.sortField,
        category: this.filterGenre,
        country: this.country,
        year: this.year,
      },
    });
  }

  handlePageChange(newPage: any) {
    this.router.navigate([], {
      queryParams: {
        page: newPage,
        sortField: this.sortField,
        category: this.filterGenre,
        country: this.country,
        year: this.year,
      },
    });
  }

  generatePageNumbers() {
    const range = [];
    const delta = 2;

    for (let i = 1; i <= this.totalPages; i++) {
      if (
        i === 1 ||
        i === this.totalPages ||
        (i >= this.currentPage - delta && i <= this.currentPage + delta)
      ) {
        range.push(i);
      } else if (
        range.length === 0 ||
        (range[range.length - 1] !== '...' && range[range.length - 1] !== i - 1)
      ) {
        range.push('...');
      }
    }

    this.pageNumbers = range;
  }
}
