import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GalleryServices } from 'src/app/services/gallery.service';
import { Image } from 'src/app/Shared/image.model';

@Component({
  selector: 'app-single-view',
  templateUrl: './single-view.component.html',
  styleUrls: ['./single-view.component.css'],
})
export class SingleViewComponent implements OnInit {
  images: Image[] = [];
  i: number = 0;
  page: number = 1;
  nbrPages: number;

  constructor(
    private galleryService: GalleryServices,
    private router: Router
  ) {}

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log(event.key);
    if (event.key === 'u') this.undoImage();
    if (event.key === 'a') this.acceptImage();
    if (event.key === 'r') this.refuseImage();
  }

  ngOnInit(): void {
    // for (let i = 1; i < 20; i++) {
    //   this.images.push({
    //     url: 'https://picsum.photos/id/' + i + '/200/300',
    //     result: 'default',
    //   });
    // }
    this.galleryService.getImages(this.page).subscribe((res) => {
      console.log(res);
      this.images = res.data;
      this.nbrImages(res.allImagesLength);
    });
  }

  nbrImages(nbrImages: number) {
    const checkPages = (nbrImages / 20).toString().split('.');
    if (checkPages.length === 1) this.nbrPages = +checkPages[0];
    if (checkPages.length === 2) this.nbrPages = +checkPages[0] + 1;
  }

  undoImage() {
    if (this.i) this.i = this.i - 1;
  }

  acceptImage() {
    this.galleryService.filterImage({
      url: 'home/annotation',
      imageData: { url: this.images[this.i].url, result: 'accepted' },
    });
    if (this.i < this.images.length) this.i = this.i + 1;
  }

  refuseImage() {
    this.galleryService.filterImage({
      url: 'home/annotation',
      imageData: { url: this.images[this.i].url, result: 'rejected' },
    });
    if (this.i < this.images.length) this.i = this.i + 1;
  }

  previousPage() {
    this.page = this.page - 1;
    this.galleryService.getImages(this.page).subscribe((res) => {
      this.images = res.data;
    });
    this.i = 0;
  }

  nextPage() {
    this.page = this.page + 1;
    this.galleryService.getImages(this.page).subscribe((res) => {
      this.images = res.data;
    });
    this.i = 0;
  }
}
