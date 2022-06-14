import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { GalleryServices } from '../services/gallery.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  isFilter = false;
  openMenu = false;
  openProfile = false;
  activeColor = 'activeHome';

  username: string;

  singleViewMode = false;

  constructor(
    private authService: AuthService,
    private galleryService: GalleryServices,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.username = JSON.parse(localStorage.getItem('userData')).username;
    this.router.navigate(['/home']);
    this.galleryService.returned.subscribe((data: boolean) => {
      this.openProfile = data;
      this.activeColor = 'activeHome';
    });
  }

  changeMode() {
    this.singleViewMode = !this.singleViewMode;
    if (this.singleViewMode) this.router.navigate(['/home', 'single-view']);
    else this.router.navigate(['/home']);
  }

  profileComp() {
    this.openMenu = false;
    this.openProfile = true;
  }
  isActiveColor(data: number) {
    if (data === 1) this.activeColor = 'activeUser';
    if (data === 2) this.activeColor = 'activeHome';
    if (data === 3) this.activeColor = 'activeDash';
  }

  onLogout() {
    this.authService.logout();
  }
}
