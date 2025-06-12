import { Component, input } from '@angular/core';

@Component({
  selector: 'app-star-percent',
  standalone: true,
  imports: [],
  templateUrl: './star-percent.component.html',
  styleUrl: './star-percent.component.css',
})
export class StarPercentComponent {
  currentStar = input<number>(0);
  percent: number = 0;

  ngOnInit() {
    this.percent = (this.currentStar() / 10) * 100;
  }
}
