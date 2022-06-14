import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Image } from '../Shared/image.model';

@Injectable({ providedIn: 'root' })
export class GalleryServices {
  returned = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  getImages(page: number) {
    return this.http.get<{
      status: string;
      allImagesLength: number;
      length: number;
      data: Image[];
    }>(`http://localhost:3000/home?page=${page}`);
  }

  //filter and creating it in database
  filterImage(data: { url: string; imageData: Image }) {
    console.log(data.imageData.url);
    return this.http
      .post<{ status: string }>(
        `http://localhost:3000/${data.url}`,
        data.imageData
      )
      .subscribe((res) => {
        console.log(res);
      });
  }

  getCleanImages() {
    return this.http.get<{ status: String; data: Image[] }>(
      'http://localhost:3000/user/history/clean'
    );
  }

  getUncleanImages() {
    return this.http.get<{ status: String; data: Image[] }>(
      'http://localhost:3000/user/history/unclean'
    );
  }

  sendCleanImages(images: Image[]) {
    return this.http.post<{ status: string }>(
      'http://localhost:3000/home/clean',
      images
    );
  }
  sendUnCleanImages(images: Image[]) {
    return this.http.post<{ status: string }>(
      'http://localhost:3000/home/unclean',
      images
    );
  }

  getStatisticsImages() {
    return this.http.get<{
      status: string;
      lengthCleanImages: number;
      lengthUnCleanImages: number;
    }>('http://localhost:3000/dashboard');
  }
}
