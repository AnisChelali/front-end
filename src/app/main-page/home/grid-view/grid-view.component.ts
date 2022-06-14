import { Component, Input, OnInit } from '@angular/core';
import { GalleryServices } from 'src/app/services/gallery.service';
import { Image } from 'src/app/Shared/image.model';

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.css'],
})
export class GridViewComponent implements OnInit {
  @Input() images: Image[] = [];
  page: number = 1;
  nbrPages: number;
  selectedImages = [];
  isSelected: boolean = false;
  cssSelect: number;

  constructor(private galleryService: GalleryServices) {}

  ngOnInit() {
    this.galleryService.getImages(this.page).subscribe((res) => {
      console.log(res);
      this.images = res.data;
      this.nbrImages(res.allImagesLength);
    });
  }

  openImage(index: number) {
    this.isSelected = false;
    if (!Object.keys(this.images[index]).includes('selected'))
      this.images[index].selected = true;
    else delete this.images[index].selected;

    for (let i = 0; i < this.images.length; i++) {
      if (this.images[i].selected) {
        this.isSelected = true; // add border
      }
    }

    if (!this.isSelected) {
      // remove border
    }
  }

  //know number of pages from DB
  nbrImages(nbrImages: number) {
    const checkPages = (nbrImages / 20).toString().split('.');
    if (checkPages.length === 1) this.nbrPages = +checkPages[0];
    if (checkPages.length === 2) this.nbrPages = +checkPages[0] + 1;
  }

  previousPage() {
    this.page = this.page - 1;
    this.isSelected = false;
    this.selectedImages = [];
    this.galleryService.getImages(this.page).subscribe((res) => {
      this.images = res.data;
    });
  }

  nextPage() {
    this.page = this.page + 1;
    this.isSelected = false;
    this.selectedImages = [];
    this.galleryService.getImages(this.page).subscribe((res) => {
      this.images = res.data;
    });
  }

  cleanImages() {
    this.selectedImages = [];
    for (let i = 0; i < this.images.length; i++) {
      if (this.images[i].selected) this.selectedImages.push(this.images[i]);
    }
    this.galleryService
      .sendCleanImages(this.selectedImages)
      .subscribe((res) => {
        console.log(res);
      });
    window.location.reload();
  }

  uncleanImages() {
    this.selectedImages = [];
    for (let i = 0; i < this.images.length; i++) {
      if (this.images[i].selected) this.selectedImages.push(this.images[i]);
    }
    this.galleryService
      .sendUnCleanImages(this.selectedImages)
      .subscribe((res) => {
        console.log(res);
      });
    window.location.reload();
  }

  cssSelected(index: number) {
    let style = {};
    // for (let i = 0; i < this.images.length; i++) {
    //   if (this.images[i].selected) {
    //      // add border
    //   }
    // }

    if (this.images[index].selected) {
      style = {
        border: '3px solid blue',
      };
    } else {
      style = {
        border: 'none',
      };
    }
    return style;
  }
}
