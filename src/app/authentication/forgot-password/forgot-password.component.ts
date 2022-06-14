import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  error = null;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (!form.valid) return;
    console.log(form.value);
    this.authService.forgotPassword(form.value).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['/authenticate/reset-password']);
        this.error = null;
      },
      (err) => {
        console.log(err.error.message);
        this.error = err.error.message;
      }
    );
  }

  onCancel() {
    this.router.navigate(['/authenticate/login']);
  }
}
