import { Component, input } from '@angular/core';

@Component({
  selector: 'app-star',
  standalone: true,
  imports: [],
  templateUrl: './star.component.html',
  styleUrl: './star.component.css',
})
export class StarComponent {
  currentStar = input<number>(0);
  stars = Array(10).fill(0);

  isFullStar(index: number): boolean {
    return index + 1 <= Math.floor(this.currentStar());
  }

  isHalfStar(index: number): boolean {
    const decimal = this.currentStar() - Math.floor(this.currentStar());
    return index === Math.floor(this.currentStar()) && decimal >= 0.3;
  }
}
