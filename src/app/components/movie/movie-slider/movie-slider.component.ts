import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { SwiperModule } from 'swiper/angular';
import 'swiper/css';
import 'swiper/css/navigation';
import Swiper, { Navigation } from 'swiper';

@Component({
  selector: 'app-movie-slider',
  standalone: true,
  imports: [
    RouterModule,
    NgFor,
    MovieCardComponent,
    RouterModule,
    SwiperModule,
  ],
  templateUrl: './movie-slider.component.html',
  styleUrl: './movie-slider.component.css',
})
export class MovieSliderComponent {
  @Input() title!: string;
  @Input() slug!: string;
  @Input() items: any[] = [];

  constructor() {
    Swiper.use([Navigation]);
  }

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
