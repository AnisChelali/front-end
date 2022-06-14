import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { GalleryServices } from 'src/app/services/gallery.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  constructor(
    private galleryServices: GalleryServices,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  returnHome() {
    this.galleryServices.returned.next(false);
  }

  onLogout() {
    this.authService.logout();
  }
}
