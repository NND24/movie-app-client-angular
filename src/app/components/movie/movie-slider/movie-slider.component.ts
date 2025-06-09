import { NgFor } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-movie-slider',
  standalone: true,
  imports: [RouterModule, NgFor, MovieCardComponent, RouterModule],
  templateUrl: './movie-slider.component.html',
  styleUrl: './movie-slider.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MovieSliderComponent {
  @Input() title!: string;
  @Input() slug!: string;
  @Input() items: any[] = [];

  swiperBreakpoints = {
    320: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    640: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 15,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    1280: {
      slidesPerView: 5,
      spaceBetween: 25,
    },
  };
}
