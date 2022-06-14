import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { GalleryServices } from 'src/app/services/gallery.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  error = null;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.authService.updateProfile(form.value).subscribe(
      (res) => {
        console.log(res);
        this.error = null;
      },
      (err) => {
        this.error = err.error.message;
      }
    );
    // this.authService.logout()
  }
}
