import { Component, computed } from '@angular/core';
import { HeaderComponent } from '../../components/header/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { HistoryMovieCardComponent } from '../../components/movie/history-movie-card/history-movie-card.component';
import { NgForOf, NgIf } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterModule,
    HistoryMovieCardComponent,
    NgIf,
    NgForOf,
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css',
})
export class HistoryComponent {
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
