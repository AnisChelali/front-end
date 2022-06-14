import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  error = null;
  counter: number = 120;
  myInterval: any;
  subs: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.myInterval = setInterval(() => {
      if (!this.counter) clearInterval(this.myInterval);
      this.counter = this.counter - 1;
    }, 1000);
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return;
    console.log(form.value);
    this.authService.resetPassword(form.value).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['/authenticate/login']);
        this.error = null;
      },
      (err) => {
        console.log(err.error.message);
        this.error = err.error.message;
      }
    );
  }

  onCancel() {
    this.router.navigate(['/authenticate/forgot-password']);
  }

  ngOnDestroy(): void {
    this.counter = 18;
  }
}
