import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { HistoryMovieCardComponent } from '../../components/movie/history-movie-card/history-movie-card.component';
import { NgForOf, NgIf } from '@angular/common';

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
