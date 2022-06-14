import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GalleryServices } from 'src/app/services/gallery.service';
import { Image } from 'src/app/Shared/image.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  filteredImages: Image[] = [];

  constructor(
    private galleryService: GalleryServices,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onCleanImage() {
    this.galleryService.getCleanImages().subscribe((res) => {
      this.filteredImages = res.data;
    });
  }

  onUnCleanImage() {
    this.galleryService.getUncleanImages().subscribe((res) => {
      this.filteredImages = res.data;
    });
  }

  openItem(url) {
    this.router.navigate(['/image', url]);
  }
}
