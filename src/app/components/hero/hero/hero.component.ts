import { Component, Input, ViewEncapsulation } from '@angular/core';
import { DetailHeroComponent } from '../detail-hero/detail-hero.component';
import { NgForOf } from '@angular/common';
import { MovieService } from '../../../services/movie.service';
import { SwiperModule } from 'swiper/angular';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Swiper, { Navigation, Pagination } from 'swiper';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [DetailHeroComponent, NgForOf, SwiperModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class HeroComponent {
  @Input() items: any[] = [];

  constructor(private movieService: MovieService) {
    Swiper.use([Navigation, Pagination]);
  }

  config = {
    slidesPerView: 1,
    loop: true,
    autoplay: {
      delay: 4000,
    },
    pagination: {
      clickable: true,
    },
    navigation: true,
  };
}
