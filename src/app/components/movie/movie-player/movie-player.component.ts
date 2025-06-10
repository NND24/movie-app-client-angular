import {
  Component,
  ElementRef,
  Input,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import Hls from 'hls.js';

@Component({
  selector: 'app-movie-player',
  standalone: true,
  imports: [],
  templateUrl: './movie-player.component.html',
  styleUrl: './movie-player.component.css',
})
export class MoviePlayerComponent {
  @Input() videoSrc: string = '';
  @ViewChild('videoPlayer') videoRef!: ElementRef<HTMLVideoElement>;

  private hls?: Hls;

  ngAfterViewInit() {
    this.loadVideo();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['videoSrc'] && !changes['videoSrc'].firstChange) {
      this.loadVideo();
    }
  }

  private loadVideo() {
    const video = this.videoRef.nativeElement;

    if (this.hls) {
      this.hls.destroy();
      this.hls = undefined;
    }

    if (Hls.isSupported()) {
      this.hls = new Hls();
      this.hls.loadSource(this.videoSrc);
      this.hls.attachMedia(video);
      this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = this.videoSrc;
      video.addEventListener('loadedmetadata', () => {
        video.play();
      });
    }
  }

  ngOnDestroy() {
    if (this.hls) {
      this.hls.destroy();
    }
  }
}
