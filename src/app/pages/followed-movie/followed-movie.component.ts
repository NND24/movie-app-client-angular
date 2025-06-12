import { Component, computed } from '@angular/core';
import { HeaderComponent } from '../../components/header/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { UserService } from '../../services/user.service';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { FollowedMovieCardComponent } from '../../components/movie/followed-movie-card/followed-movie-card.component';
import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

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
    MatIconModule,
  ],
  templateUrl: './followed-movie.component.html',
  styleUrl: './followed-movie.component.css',
})
export class FollowedMovieComponent {
  user = computed(() => this.userService.user());
  private destroy$ = new Subject<void>();

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
