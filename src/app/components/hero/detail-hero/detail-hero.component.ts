import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detail-hero',
  standalone: true,
  imports: [],
  templateUrl: './detail-hero.component.html',
  styleUrl: './detail-hero.component.css',
})
export class DetailHeroComponent {
  @Input() slug: string = '';
}
