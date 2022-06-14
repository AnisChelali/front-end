import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GalleryServices } from 'src/app/services/gallery.service';
import { Image } from 'src/app/Shared/image.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private galleryService: GalleryServices,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {}
}
