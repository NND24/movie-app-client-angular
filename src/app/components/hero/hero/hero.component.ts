import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DetailHeroComponent } from '../detail-hero/detail-hero.component';
import { NgForOf } from '@angular/common';
import { MovieService } from '../../../services/movie.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [DetailHeroComponent, NgForOf],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeroComponent {
  items: any[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.movieService.getNewUpdatedMovie(1).subscribe({
      next: (res) => {
        this.items = res.items;
      },
    });
  }
}
