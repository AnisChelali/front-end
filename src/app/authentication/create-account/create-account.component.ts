import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthResponseData, AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css'],
})
export class CreateAccountComponent implements OnInit {
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (form.invalid) return;
    console.log(form.value);
    this.authService.signup(form.value).subscribe(
      (res: AuthResponseData) => {
        console.log(res);
        this.router.navigate(['/authenticate/login']);
      },
      (err: any) => {
        this.error = err.error.message;
      }
    );
    form.reset();
  }

  onCancel() {
    this.router.navigate(['/authenticate']);
  }

  onHandlingError() {
    this.error = null;
  }
}
