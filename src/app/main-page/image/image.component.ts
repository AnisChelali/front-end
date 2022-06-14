import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GalleryServices } from '../../services/gallery.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css'],
})
export class ImageComponent implements OnInit {
  url = null;

  constructor(
    private galleryService: GalleryServices,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'a') this.acceptImage();
    if (event.key === 'r') this.refuseImage();
  }

  ngOnInit(): void {
    this.url = this.route.snapshot.params['url'];
    console.log(this.url);
  }

  acceptImage() {
    this.galleryService.filterImage({
      url: 'image/annotation',
      imageData: { url: this.url, result: 'accepted' },
    });
    this.router.navigate(['/user/history']);
    // this.http.post({ url: this.url, result: 'REJECTED' });
  }

  refuseImage() {
    this.galleryService.filterImage({
      url: 'image/annotation',
      imageData: { url: this.url, result: 'rejected' },
    });
    this.router.navigate(['/user/history']);
  }
}
