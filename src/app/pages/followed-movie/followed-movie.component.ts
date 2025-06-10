import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { UserService } from '../../services/user.service';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { FollowedMovieCardComponent } from '../../components/movie/followed-movie-card/followed-movie-card.component';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-followed-movie',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    FollowedMovieCardComponent,
    NgIf,
    NgForOf,
    RouterModule,
  ],
  templateUrl: './followed-movie.component.html',
  styleUrl: './followed-movie.component.css',
})
export class FollowedMovieComponent {
  user: any;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });

    this.userService.user$.subscribe((data) => {
      this.user = data;
    });
  }
}
