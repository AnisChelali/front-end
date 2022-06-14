import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthResponseData, AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (form.invalid) return;
    this.authService.login(form.value).subscribe(
      (res: AuthResponseData) => {
        console.log(res);
        this.router.navigate(['/home']);
      },
      (err: any) => {
        this.error = err.error.message;
      }
    );

    form.reset();
  }

  onForgotPass() {
    this.router.navigate(['/authenticate/forgot-password']);
  }

  onCancel() {
    this.router.navigate(['/authenticate']);
  }

  onHandlingError() {
    this.error = null;
  }
}
